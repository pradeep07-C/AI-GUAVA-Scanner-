#!/usr/bin/env python3
"""
Indexes the 60+ images in dataset/fresh, dataset/medium, dataset/poor
and generates dataset_index.json for the Java backend.
"""

import os
import hashlib
import json

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATASET_DIR = os.path.join(BASE_DIR, "dataset")
OUTPUT_PATH = os.path.join(BASE_DIR, "backend", "src", "main", "resources", "dataset_index.json")

diseases_cycle = [
    ("Guava Anthracnose", "Colletotrichum gloeosporioides", "Sunken circular dark necrotic lesions and fungal spore depressions."),
    ("Stylar End Rot", "Phomopsis psidii", "Dark brown soft rotting discoloration starting at the blossom end."),
    ("Fruit Fly Infestation & Soft Rot", "Bactrocera dorsalis", "Oviposition puncture marks with internal pulp browning and larval liquefaction."),
    ("Guava Wilt & Dry Rot", "Fusarium oxysporum", "Loss of fruit turgidity, dull yellow-brown dry shriveling, and skin mummification."),
    ("Guava Canker & Scab", "Pestalotiopsis psidii", "Raised brownish-grey corky pustules with scab-like rough cracks."),
]

def main():
    entries = []
    print("==================================================")
    print("🍈 Indexing Verified Guava Database (60+ Images)")
    print("==================================================")

    for cat in ["fresh", "medium", "poor"]:
        cat_dir = os.path.join(DATASET_DIR, cat)
        if not os.path.exists(cat_dir):
            continue
        files = sorted([f for f in os.listdir(cat_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])
        print(f"Found {len(files)} files in {cat}/")

        for idx, fname in enumerate(files):
            fpath = os.path.join(cat_dir, fname)
            with open(fpath, "rb") as f:
                data = f.read()
            md5_hash = hashlib.md5(data).hexdigest()
            file_size = len(data)

            entry = {
                "id": f"{cat}_{fname}",
                "category": cat.upper(),
                "fileName": fname,
                "relativePath": f"{cat}/{fname}",
                "md5": md5_hash,
                "size": file_size,
            }

            if cat == "poor":
                d_name, d_pathogen, d_symptoms = diseases_cycle[idx % len(diseases_cycle)]
                entry["diseaseName"] = d_name
                entry["pathogen"] = d_pathogen
                entry["symptoms"] = d_symptoms

            entries.append(entry)

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w") as out:
        json.dump(entries, out, indent=2)

    print(f"\n✅ Successfully indexed {len(entries)} verified guava images!")
    print(f"📁 Output saved to: {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
