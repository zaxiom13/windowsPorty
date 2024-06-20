#!/bin/bash

# Directory containing the files
DIR="."
# Output file
OUTPUT="output.txt"
# Clear the output file if it exists
> "$OUTPUT"

# Find all files in the directory and subdirectories, excluding certain file types
find "$DIR" -type f ! \( -name '*.svg' -o -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' -o -name '*.webp' -o -name '*.gif' -o -name '*.bmp' \) | while read -r FILE; do
    # Get the filename
    FILENAME=$(basename "$FILE")
    # Get the relative path (remove the leading "./" if present)
    RELPATH=$(dirname "$FILE" | sed 's|^\./||')
    
    # Add a banner with the filename and its path
    echo "=======================" >> "$OUTPUT"
    if [ "$RELPATH" = "." ]; then
        echo "File: $FILENAME" >> "$OUTPUT"
    else
        echo "File: $RELPATH/$FILENAME" >> "$OUTPUT"
    fi
    echo "=======================" >> "$OUTPUT"
    
    # Append the contents of each file to the output file
    cat "$FILE" >> "$OUTPUT"
    echo >> "$OUTPUT"  # Add a newline for separation
done

echo "All files have been concatenated into $OUTPUT"