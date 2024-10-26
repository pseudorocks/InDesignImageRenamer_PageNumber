# InDesign Image Renamer Script

This script renames linked image files in Adobe InDesign based on the page number. It adds a prefix in the format "Page_XXXX - " (where "XXXX" is the zero-padded page number) to the file name. 

## Features

- Removes any existing "Page_XXXX - " prefix before adding the new one, preventing duplicate prefixes.
- Supports multiple selections and only processes images or frames with images.
- Logs all operations to a debug file (`debug_log.txt`) in the same directory as the script, for easy debugging and review.

## Installation

1. Save the `.jsx` file in your InDesign Scripts folder or any location of your choice.
2. Open Adobe InDesign.
3. Go to `Window > Utilities > Scripts`.
4. Right-click `User` and select `Reveal in Finder` (Mac) or `Reveal in Explorer` (Windows).
5. Place the `.jsx` file in the revealed directory.

## Usage

1. In InDesign, select the images you want to rename.
2. Run the script by double-clicking it in the Scripts panel.
3. After completion, check `debug_log.txt` for a detailed log of the operation. 

## Troubleshooting

### Duplicate Prefix Issue

If you encounter repeated prefixes in your filenames, check the `debug_log.txt` file to verify that the file names are correctly formatted before and after processing. The script handles URL-encoded characters by decoding them before processing.

### Permissions Issues

If the script fails to write `debug_log.txt`, ensure that InDesign has permission to write files to the script directory.

## Example

For an image on page 9 with the original name `image.jpg`:

- Before running the script: `image.jpg`
- After running the script: `Page_0009 - image.jpg`

For additional details, see the debug file generated in the script directory.

---

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
