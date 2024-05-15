#!/bin/bash

# Directory containing the text files
DIR="."

# Output file
OUTPUT="output.txt"

# Clear the output file if it exists
> "$OUTPUT"

# Find all text files in the directory and subdirectories, excluding certain file types
find "$DIR" -type f ! \( -name '*.svg' -o -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' -o -name '*.webp' -o -name '*.gif' -o -name '*.bmp' \) | while read -r FILE; do
    FILENAME=$(basename "$FILE")
    # Add a banner with the filename
    echo "=======================" >> "$OUTPUT"
    echo "File: $FILENAME" >> "$OUTPUT"
    echo "=======================" >> "$OUTPUT"
    # Append the contents of each file to the output file
    cat "$FILE" >> "$OUTPUT"
    echo >> "$OUTPUT"  # Add a newline for separation
done

echo "All files have been concatenated into $OUTPUT"
