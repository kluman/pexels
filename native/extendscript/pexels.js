﻿#targetengine "com.github.kluman.pexels_Engine_Id"

// ExtendScript developers need to create external object instance first to dispatch messages back to plugin.
var externalObjectName = "PlugPlugExternalObject";
var myLib = new ExternalObject( "lib:" + externalObjectName );

function pexelsPlaceImage(path, width, height, attribution, selection) {
    try {
        var document = app.activeDocument;
        var result = undefined;
        
        if (document && document.isValid) {
            var activeSelection = selection||app.selection;
            
            switch (activeSelection.constructor.name) {
                case 'TextFrame':
                case 'Polygon':
                case 'Oval':
                case 'Image':
                case 'Rectangle':
                    try {
                        var file = new File(path);
                        if (file.length > 0) {
                            activeSelection.place(file);
                            activeSelection.fit(FitOptions.FILL_PROPORTIONALLY);

                            if (attribution) {
                                var bounds = activeSelection.geometricBounds;
                                var textFrame = document.textFrames.add();
                                textFrame.contents = attribution;
                                textFrame.geometricBounds = [bounds[2], bounds[1], bounds[2] + 1.2, bounds[3]]
                            }

                            result = "Ok";
                        } else {
                            result = "Unable to place file at path " + path;
                        }
                    
                    } catch(e) {
                        result = "Error: " + e.message;
                    }

                    break;
                case 'Array':
                    if (activeSelection.length > 0) {
                        pexelsPlaceImage(path, width, height, attribution, activeSelection[0]);
                        return;
                    }
                default:
                    try {
                        var file = new File(path);
                        if (file.length > 0) {
                            var file = new File(path);
                            var rectangle = document.rectangles.add();
                            var x2 = (height / width) * 20                        
                            rectangle.geometricBounds = [2, 2,  x2, 20];  // [y1, x1, y2, x2]
                            rectangle.place(file);
                            rectangle.fit(FitOptions.FILL_PROPORTIONALLY);

                            if (attribution) {
                                var bounds = rectangle.geometricBounds;
                                var textFrame = document.textFrames.add();
                                textFrame.contents = attribution;
                                textFrame.geometricBounds = [bounds[2], bounds[1], bounds[2] + 1.2, bounds[3]]
                            }

                            result = "Ok";
                        } else {
                            result = "Unable to place file at path " + path;
                        }
                    
                    } catch(e) {
                        result = "Error: " + e.message;
                    }
            }
        
        } else {
            result = "No active document.";
        }
    } catch (e) {
        result = "Unknown error " + e;
    }

    return result;
}
