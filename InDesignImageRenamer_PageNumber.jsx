// Script to rename linked image files based on the page number with a prefix, only for selected images
// Debugging file for detailed logging of all steps
// var debugFile = new File(File($.fileName).parent + "/debug_log.txt"); // Location of the debug file in the script directory
// debugFile.open("w"); // Open the file in write mode
// debugFile.writeln("Debug Log - InDesign Image Rename Script");
// debugFile.writeln("=====================================\n");

// Function to format the page number with leading zeros and prefix
function formatPageNumber(pageNumber) {
    var pageNumberFormatted = ("0000" + pageNumber).slice(-4);
    return "Page_" + pageNumberFormatted + " - ";
}

// Retrieve active document
var doc = app.activeDocument;

// Object to track already renamed files
var renamedFiles = {};

// Check if there is a selection
if (app.selection.length === 0) {
    alert("Please select at least one image.");
} else {
    // Iterate through all selected objects
    for (var i = 0; i < app.selection.length; i++) {
        var item = app.selection[i];

        // debugFile.writeln("Processing selection object #" + (i + 1));

        // Check if the selected object is an image or a frame containing an image
        var graphic;

        if (item instanceof Graphic || item instanceof Image || item.constructor.name === "Image") {
            graphic = item;
        } else if (item.allGraphics && item.allGraphics.length > 0) {
            graphic = item.allGraphics[0];
        } else {
            // Error message for invalid object type
            continue;
        }

        var link = graphic.itemLink;

        // Skip if there is no valid link
        if (!link) {
            continue;
        }

        var file = new File(link.filePath);
        // debugFile.writeln("Original file path: " + link.filePath);

        // Get page number
        var pageNumber;
        try {
            // Get numerical page number (starting from 1)
            pageNumber = graphic.parentPage.documentOffset + 1;
            // debugFile.writeln("Page number of the image: " + pageNumber);
        } catch (e) {
            // Skip if the image is not on a regular page
            continue;
        }

        // Format page number with leading zeros and prefix
        var desiredPrefix = formatPageNumber(pageNumber);
        // debugFile.writeln("Desired prefix: " + desiredPrefix);

        // Original file name without path and URL-decoding
        var fileName = decodeURI(file.name); // URL-decode the file name
        // debugFile.writeln("File name before processing: " + fileName);

        // Check if there is already a prefix in the format "Page_XXXX - " and remove it
        var regex = /^Page_\d{4}\s*-\s*/;
        while (fileName.match(regex)) { // As long as the prefix is found, remove it
            fileName = fileName.replace(regex, '');
        }
        // debugFile.writeln("File name after removing prefix (if present): " + fileName);

        // Check if the desired prefix is already present (index-based, case-insensitive)
        var newFileName;
        if (fileName.toLowerCase().indexOf(desiredPrefix.toLowerCase()) !== 0) {
            // Add prefix only if it does not already exist
            newFileName = desiredPrefix + fileName;
        } else {
            // Prefix already exists, skip without feedback
            continue;
        }

        var newFilePath = file.path + "/" + newFileName;

        // Check if a file with the new name already exists
        var newFile = new File(newFilePath);
        if (newFile.exists) {
            // Skip if the file already exists
            continue;
        }

        // Rename the file
        var success = file.copy(newFilePath);
        if (success) {
            file.remove(); // Delete the original file

            // Update link in the InDesign document
            link.relink(newFile);
            link.update();

            // Save renamed file path
            renamedFiles[link.id] = newFilePath;
        } else {
            // Alert if the file could not be renamed
            alert("Error: Could not rename file: " + file.name);
        }
    }
}

// Close the debug file
// debugFile.close();
