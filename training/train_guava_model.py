#!/usr/bin/env python3
"""
Guava Quality & Disease Classification Model Trainer
Dataset: 1,000 Guava Images categorized into:
  - fresh/
  - medium/
  - poor/

Architecture: MobileNetV2 (Transfer Learning)
Output: ONNX model (guava_model.onnx) for Java Spring Boot inference
"""

import os
import sys
import shutil
import time

def check_dependencies():
    missing = []
    try:
        import torch
        import torchvision
    except ImportError:
        missing.append("torch torchvision")
    try:
        import onnx
    except ImportError:
        missing.append("onnx")
    try:
        from PIL import Image
    except ImportError:
        missing.append("Pillow")

    if missing:
        print("[!] Missing Python packages for training:")
        print(f"    Run: pip install {' '.join(missing)}")
        return False
    return True

def train():
    if not check_dependencies():
        print("\nPlease install the required packages and run again.")
        return

    import torch
    import torch.nn as nn
    import torch.optim as optim
    from torchvision import datasets, models, transforms
    from torch.utils.data import DataLoader

    dataset_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "dataset"))
    classes = ["fresh", "medium", "poor"]

    print("==================================================")
    print("🍈 Guava 1,000 Image Classification Trainer")
    print(f"📁 Dataset Directory: {dataset_dir}")
    print("==================================================")

    for c in classes:
        c_dir = os.path.join(dataset_dir, c)
        count = len([f for f in os.listdir(c_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]) if os.path.exists(c_dir) else 0
        print(f"  - Class '{c}': {count} images found")

    device = torch.device("mps" if torch.backends.mps.is_available() else "cuda" if torch.cuda.is_available() else "cpu")
    print(f"\n⚡ Training Device: {device}")

    # Data augmentations
    data_transforms = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(15),
        transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    try:
        dataset = datasets.ImageFolder(dataset_dir, transform=data_transforms)
    except Exception as e:
        print(f"[!] Error loading dataset: {e}")
        print("Please ensure dataset/fresh, dataset/medium, and dataset/poor have images.")
        return

    if len(dataset) == 0:
        print("[!] No images found in dataset directory. Add images to dataset/fresh, dataset/medium, dataset/poor.")
        return

    train_size = int(0.8 * len(dataset))
    val_size = len(dataset) - train_size
    train_data, val_data = torch.utils.data.random_split(dataset, [train_size, val_size])

    train_loader = DataLoader(train_data, batch_size=16, shuffle=True)
    val_loader = DataLoader(val_data, batch_size=16, shuffle=False)

    print(f"\n📊 Total Images: {len(dataset)} | Train: {train_size} | Validation: {val_size}")

    # MobileNetV2
    model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.DEFAULT)
    for param in model.features.parameters():
        param.requires_grad = False  # Freeze backbone

    # Replace classifier head for 3 classes
    model.classifier[1] = nn.Sequential(
        nn.Dropout(0.2),
        nn.Linear(model.last_channel, 3)
    )
    model = model.to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.classifier.parameters(), lr=0.001)

    epochs = 10
    print(f"\n🚀 Starting training for {epochs} epochs...")

    start_time = time.time()
    for epoch in range(epochs):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        for inputs, labels in train_loader:
            inputs, labels = inputs.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item() * inputs.size(0)
            _, preds = torch.max(outputs, 1)
            correct += torch.sum(preds == labels.data).item()
            total += labels.size(0)

        epoch_acc = (correct / total) * 100 if total > 0 else 0
        print(f"Epoch [{epoch+1:02d}/{epochs:02d}] - Loss: {running_loss/max(1, total):.4f} - Train Acc: {epoch_acc:.2f}%")

    print(f"\n✅ Training completed in {time.time() - start_time:.1f}s")

    # Export to ONNX
    model.eval()
    dummy_input = torch.randn(1, 3, 224, 224, device=device)
    onnx_path = os.path.join(os.path.dirname(__file__), "guava_model.onnx")

    torch.onnx.export(
        model,
        dummy_input,
        onnx_path,
        export_params=True,
        opset_version=14,
        do_constant_folding=True,
        input_names=['input'],
        output_names=['output'],
        dynamic_axes={'input': {0: 'batch_size'}, 'output': {0: 'batch_size'}}
    )
    print(f"📦 Exported ONNX model to: {onnx_path}")

    # Copy to Spring Boot resources
    backend_model_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend", "src", "main", "resources", "models"))
    os.makedirs(backend_model_dir, exist_ok=True)
    dest_path = os.path.join(backend_model_dir, "guava_model.onnx")
    shutil.copyfile(onnx_path, dest_path)
    print(f"🚀 Installed model to Spring Boot Backend: {dest_path}")
    print("\n✨ All done! Your Java Spring Boot app will now use this trained model.")

if __name__ == "__main__":
    train()
