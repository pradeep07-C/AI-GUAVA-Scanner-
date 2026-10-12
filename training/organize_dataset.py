#!/usr/bin/env python3
"""
Inspect and validate the 1,000 guava dataset distribution.
"""
import os

def check():
    dataset_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "dataset"))
    classes = ["fresh", "medium", "poor"]
    total = 0

    print("==================================================")
    print("🍈 Guava Dataset Inspector (Teacher's Database)")
    print(f"Path: {dataset_dir}")
    print("==================================================")

    for c in classes:
        c_dir = os.path.join(dataset_dir, c)
        if not os.path.exists(c_dir):
            os.makedirs(c_dir, exist_ok=True)
            count = 0
        else:
            try:
                files = [f for f in os.listdir(c_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
                count = len(files)
            except Exception:
                count = 0
        total += count
        status = "✅ Populated" if count > 0 else "⚠️ Empty (drop pictures here)"
        print(f"📁 {c.upper():<7} : {count:>4} images | {status}")

    print("--------------------------------------------------")
    print(f"Total Images: {total} / 1000")
    if total == 0:
        print("\n💡 Tip: Copy your teacher's 1,000 photos into:")
        print(f"   - {os.path.join(dataset_dir, 'fresh')}")
        print(f"   - {os.path.join(dataset_dir, 'medium')}")
        print(f"   - {os.path.join(dataset_dir, 'poor')}")

if __name__ == "__main__":
    check()
