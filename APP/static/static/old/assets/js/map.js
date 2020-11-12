"use strict";

function LoadMap_main() {
    // option
    if ($('#main-map').length) {
        var myLocationEnabled = true;
        var style_map = [{"featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{"color": "#444444"}]}, {"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"}]}, {"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "off"}]}, {"featureType": "road", "elementType": "all", "stylers": [{"saturation": -100}, {"lightness": 45}]}, {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "simplified"}]}, {"featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "all", "stylers": [{"color": "#46bcec"}, {"visibility": "on"}]}];
        var scrollwheelEnabled = false;

        var markers = new Array();
        var mapOptions = {
            center: new google.maps.LatLng(34.015008, -118.473215),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: scrollwheelEnabled,
            // styles:style_map
        };
        var markers_map = new Array(
                [34.05843, -118.491046, 'assets/img/markers/default.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
                [34.066673, -118.486562, 'assets/img/markers/default.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
                [34.009714, -118.480296, 'assets/img/markers/default.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
                [34.010408, -118.473215, 'assets/img/markers/default.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
                [34.01521, -118.474889, 'assets/img/markers/default.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
                [34.022502, -118.480124, 'assets/img/markers/default.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
                [34.024423, -118.459868, 'assets/img/markers/default.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
                [34.024885, -118.44871, 'assets/img/markers/default.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
                [34.002368, -118.482828, 'assets/img/markers/default.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG']
                );

        var map = new google.maps.Map(document.getElementById('main-map'), mapOptions);

        $.each(markers_map, function (index, marker_map) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(marker_map[0], marker_map[1]),
                map: map,
                icon: marker_map[2]
            });

            var myOptions = {
                content: '<div class="infobox">\n\
                            <div class="thumbnail thumbnail-property <!--features-->">\n\
                            <div class="property-image">\n\
                            <img src="' + marker_map[3] + '" alt="car">\n\
                            <div class="image-count">\n\
                            <i class="icon-image"></i>\n\
                            <span>2</span>\n\
                            </div>\n\
                            <!--<div class="budget budget-used">\n\
                            <div class="budget-mask"><span>Used</span></div>\n\
                            </div>-->\n\
                            <a href="listing.html" class="property-image-hover">\n\
                            <span class="property-im-m property-im-m-lt"></span>\n\
                            <span class="property-im-m property-im-m-lb"></span>\n\
                            <span class="property-im-m property-im-m-rt"></span>\n\
                            <span class="property-im-m property-im-m-rb"></span>\n\
                            </a>\n\
                                        </div>\n\
                            <div class="caption">\n\
                            <!--<div class="anchor active">\n\
                            <a href="#" class=""><i class="fa fa-bookmark"></i>\n\
                            </a>\n\
                            </div>-->\n\
                            <h3 class="property-title"><a href="listing.html">' + marker_map[4] + '</a></h3>\n\
                            <p class="property-description">2014. g. 39.138 km, 66kW/90KS</p>\n\
                            <span class="property-field">114.630 kn</span>\n\
                            <div class="property-ratings">\n\
                            <i class="icon-star-ratings-3"></i>\n\
                            </div>\n\
                            </div>\n\
                            </div>\n\
                        </div>',
                disableAutoPan: false,
                maxWidth: 0,
                pixelOffset: new google.maps.Size(-138, -325),
                zIndex: null,
                infoBoxClearance: new google.maps.Size(1, 1),
                position: new google.maps.LatLng(marker_map[0], marker_map[1]),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false,
                closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
            };
            marker.infobox = new InfoBox(myOptions);
            marker.infobox.isOpen = false;
            markers.push(marker);

            // action        
            google.maps.event.addListener(marker, "click", function (e) {
                var curMarker = this;

                $.each(markers, function (index, marker) {
                    // if marker is not the clicked marker, close the marker
                    if (marker !== curMarker) {
                        marker.infobox.close();
                        marker.infobox.isOpen = false;
                    }
                });

                if (curMarker.infobox.isOpen === false) {
                    curMarker.infobox.open(map, this);
                    curMarker.infobox.isOpen = true;
                    map.panTo(curMarker.getPosition());
                    var b = curMarker.infobox.getElementById('btn-close');

                } else {
                    curMarker.infobox.close();
                    curMarker.infobox.isOpen = false;
                }

            });
        });

        var mcOptions = {
            gridSize: 40,
            styles: [
                {
                    height: 52,
                    url: 'assets/img/cluster/m1.png',
                    width: 52,
                    textColor: '#fff'
                }
            ]
        };

        var marker_clusterer = new MarkerClusterer(map, markers, mcOptions);
        if (myLocationEnabled) {
            // [START gmap mylocation]

            // Construct your control in whatever manner is appropriate.
            // Generally, your constructor will want access to the
            // DIV on which you'll attach the control UI to the Map.
            var controlDiv = document.createElement('div');

            // We don't really need to set an index value here, but
            // this would be how you do it. Note that we set this
            // value as a property of the DIV itself.
            controlDiv.index = 1;

            // Add the control to the map at a designated control position
            // by pushing it on the position's array. This code will
            // implicitly add the control to the DOM, through the Map
            // object. You should not attach the control manually.
            map.controls[google.maps.ControlPosition.RIGHT_TOP].push(controlDiv);

            HomeControl(controlDiv, map)

            // [END gmap mylocation]
        }
    }
}

function LoadMap_main_color () {
    // option
    if ($('#main-map-color').length) {
        var myLocationEnabled = true;
        var style_map = [{"featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{"color": "#444444"}]}, {"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"}]}, {"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "off"}]}, {"featureType": "road", "elementType": "all", "stylers": [{"saturation": -100}, {"lightness": 45}]}, {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "simplified"}]}, {"featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "all", "stylers": [{"color": "#46bcec"}, {"visibility": "on"}]}];
        var scrollwheelEnabled = false;

        var markers = new Array();
        var mapOptions = {
            center: new google.maps.LatLng(34.015008, -118.473215),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: scrollwheelEnabled,
            // styles:style_map
        };
        var markers_map = new Array(
            [34.05843, -118.491046, 'assets/img/markers/train.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
            [34.066673, -118.486562, 'assets/img/markers/bus.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
            [34.009714, -118.480296, 'assets/img/markers/bus.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
            [34.010408, -118.473215, 'assets/img/markers/bus.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
            [34.01521, -118.474889, 'assets/img/markers/type_3.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
            [34.022502, -118.480124, 'assets/img/markers/train.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
            [34.024423, -118.459868, 'assets/img/markers/train.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
            [34.024885, -118.44871, 'assets/img/markers/type_3.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG'],
            [34.002368, -118.482828, 'assets/img/markers/bus.png', 'assets/img/placeholders/275x165.png', 'Audi A3 Sportback 1,6 TDI DSG']
        );

        var map = new google.maps.Map(document.getElementById('main-map-color'), mapOptions);

        $.each(markers_map, function (index, marker_map) {
            
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(marker_map[0], marker_map[1]),
                map: map,
                icon: 'assets/img/markers/marker-transparent.png'
            });

            var markerOptions_1 = {
                content: '<div class="infobox">\n\
                            <div class="thumbnail thumbnail-property <!--features-->">\n\
                            <div class="property-image">\n\
                            <img src="' + marker_map[3] + '" alt="car">\n\
                            <div class="image-count">\n\
                            <i class="icon-image"></i>\n\
                            <span>2</span>\n\
                            </div>\n\
                            <!--<div class="budget budget-used">\n\
                            <div class="budget-mask"><span>Used</span></div>\n\
                            </div>-->\n\
                            <a href="listing.html" class="property-image-hover">\n\
                            <span class="property-im-m property-im-m-lt"></span>\n\
                            <span class="property-im-m property-im-m-lb"></span>\n\
                            <span class="property-im-m property-im-m-rt"></span>\n\
                            <span class="property-im-m property-im-m-rb"></span>\n\
                            </a>\n\
                                        </div>\n\
                            <div class="caption">\n\
                            <!--<div class="anchor active">\n\
                            <a href="#" class=""><i class="fa fa-bookmark"></i>\n\
                            </a>\n\
                            </div>-->\n\
                            <h3 class="property-title"><a href="listing.html">' + marker_map[4] + '</a></h3>\n\
                            <p class="property-description">2014. g. 39.138 km, 66kW/90KS</p>\n\
                            <span class="property-field">114.630 kn</span>\n\
                            <div class="property-ratings">\n\
                            <i class="icon-star-ratings-3"></i>\n\
                            </div>\n\
                            </div>\n\
                            </div>\n\
                        </div>',
                disableAutoPan: false,
                maxWidth: 0,
                pixelOffset: new google.maps.Size(-141, -365),
                zIndex: null,
                infoBoxClearance: new google.maps.Size(1, 1),
                position: new google.maps.LatLng(marker_map[0], marker_map[1]),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false,
                closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
            };
            marker.infobox = new InfoBox(markerOptions_1);
            marker.infobox.isOpen = false;
            // marker
            var markerOptions_2 = {
                draggable: false,
                content: '<div class="google_marker"><img src="'+marker_map[2]+'"></div>',
                disableAutoPan: true,
                pixelOffset: new google.maps.Size(-21, -58),
                position: new google.maps.LatLng(marker_map[0], marker_map[1]),
                closeBoxMargin: "",
                closeBoxURL: "",
                isHidden: false,
                //pane: "mapPane",
                enableEventPropagation: true
            };
            marker.marker = new InfoBox(markerOptions_2);      
            marker.marker.isHidden = false;      
            marker.marker.open(map, marker);
            markers.push(marker);
                    
            // action        
            google.maps.event.addListener(marker, "click", function (e) {
                var curMarker = this;

                $.each(markers, function (index, marker) {
                    // if marker is not the clicked marker, close the marker
                    if (marker !== curMarker) {
                        marker.infobox.close();
                        marker.infobox.isOpen = false;
                    }
                });

                if (curMarker.infobox.isOpen === false) {
                    curMarker.infobox.open(map, this);
                    curMarker.infobox.isOpen = true;
                    map.panTo(curMarker.getPosition());
                } else {
                    curMarker.infobox.close();
                    curMarker.infobox.isOpen = false;
                }

            });
        });

        var mcOptions = {
                gridSize: 40,
                styles: [
                        {
                            height: 52,
                            url: 'assets/img/cluster/m1.png',
                            width: 52,
                            textColor: '#fff'
                        }
                ]
            };

        var marker_clusterer = new MarkerClusterer(map, markers, mcOptions);
        var clusterListener = google.maps.event.addListener(marker_clusterer, 'clusteringend', function (clusterer) {
                var availableClusters = clusterer.getClusters();
                var activeClusters = new Array();
                $.each(availableClusters, function (index, cluster) {
                        if (cluster.getMarkers().length > 1) {
                                $.each(cluster.getMarkers(), (function (index, marker) {
                                        if (marker.marker.isHidden == false) {
                                                marker.marker.isHidden = true;
                                                marker.marker.close();
                                        }
                                }));
                        } else {
                                $.each(cluster.getMarkers(), function (index, marker) {
                                        if (marker.marker.isHidden == true) {
                                                marker.marker.open(map, this);
                                                marker.marker.isHidden = false;
                                        }
                                });
                        }
                });
        });
        if (myLocationEnabled) {
            // [START gmap mylocation]

            // Construct your control in whatever manner is appropriate.
            // Generally, your constructor will want access to the
            // DIV on which you'll attach the control UI to the Map.
            var controlDiv = document.createElement('div');

            // We don't really need to set an index value here, but
            // this would be how you do it. Note that we set this
            // value as a property of the DIV itself.
            controlDiv.index = 1;

            // Add the control to the map at a designated control position
            // by pushing it on the position's array. This code will
            // implicitly add the control to the DOM, through the Map
            // object. You should not attach the control manually.
            map.controls[google.maps.ControlPosition.RIGHT_TOP].push(controlDiv);

            HomeControl(controlDiv, map)

            // [END gmap mylocation]
        }
    }
}

function HomeControl(controlDiv, map) {

    // Set CSS styles for the DIV containing the control
    // Setting padding to 5 px will offset the control
    // from the edge of the map.
    controlDiv.style.padding = '5px';

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.id = 'my_location';
    controlUI.style.backgroundColor = 'white';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '2px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.margin = '5px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'My Location';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.innerHTML = '<strong>My Location</strong>';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    google.maps.event.addDomListener(controlUI, 'click', function () {
        var myloc = new google.maps.Marker({
            clickable: false,
            icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                    new google.maps.Size(22, 22),
                    new google.maps.Point(0, 18),
                    new google.maps.Point(11, 11)),
            shadow: null,
            zIndex: 999,
            map: map
        });

        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(function (pos) {
                var me = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                myloc.setPosition(me);

                // Zoom in
                var bounds = new google.maps.LatLngBounds();
                bounds.extend(me);
                map.fitBounds(bounds);
                var zoom = map.getZoom();
                map.setZoom(zoom > zoomOnMapSearch ? zoomOnMapSearch : zoom);
            }, function (error) {
                console.log(error);
            });
    });
}

function map_property() {

    var map;
    if ($('#property-map').length) {
        var myLocationEnabled = true;
        var style_map = null;
        var scrollwheelEnabled = false;

        var markers = new Array();
        var mapOptions = {
            center: new google.maps.LatLng(45.812231, 15.920618),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: scrollwheelEnabled,
            //styles:style_map
        };

        var map = new google.maps.Map(document.getElementById('property-map'), mapOptions);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(45.812231, 15.920618),
            map: map,
            //icon: 'assets/img/markers/hause.png'
        });

        var myOptions = {
            content: "<div class='infobox2'>Address: Ilica 345, HR-10000 Zagreb</div>",
            disableAutoPan: false,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-138, -70),
            zIndex: null,
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(1, 1),
            position: new google.maps.LatLng(45.812231, 15.920618),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false
        };

        marker.infobox = new InfoBox(myOptions);
        marker.infobox.isOpen = false;
        markers.push(marker);

        // action        
        google.maps.event.addListener(marker, "click", function (e) {
            var curMarker = this;

            $.each(markers, function (index, marker) {
                if (marker !== curMarker) {
                    marker.infobox.close();
                    marker.infobox.isOpen = false;
                }
            });

            if (curMarker.infobox.isOpen === false) {
                curMarker.infobox.open(map, this);
                curMarker.infobox.isOpen = true;
                map.panTo(curMarker.getPosition());
            } else {
                curMarker.infobox.close();
                curMarker.infobox.isOpen = false;
            }

        });

        if (myLocationEnabled) {
            var controlDiv = document.createElement('div');
            controlDiv.index = 1;
            map.controls[google.maps.ControlPosition.RIGHT_TOP].push(controlDiv);
            HomeControl(controlDiv, map)
        }
    }

}

function contactMap(){
    var map;
    if ($('#contact-map').length) {
        var myLocationEnabled = true;
        var style_map = [{"featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{"color": "#444444"}]}, {"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"}]}, {"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "off"}]}, {"featureType": "road", "elementType": "all", "stylers": [{"saturation": -100}, {"lightness": 45}]}, {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "simplified"}]}, {"featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "all", "stylers": [{"color": "#46bcec"}, {"visibility": "on"}]}];
        var scrollwheelEnabled = false;

        var markers = new Array();
        var mapOptions = {
            center: new google.maps.LatLng(45.812231, 15.920618),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: scrollwheelEnabled,
            styles: style_map
        };

        var map = new google.maps.Map(document.getElementById('contact-map'), mapOptions);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(45.812231, 15.920618),
            map: map,
            icon: 'assets/img/markers/default.png'
        });

        var myOptions = {
            content: "<div class='infobox2'>Address: Ilica 345, HR-10000 Zagreb</div>",
            disableAutoPan: false,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-138, -70),
            zIndex: null,
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(1, 1),
            position: new google.maps.LatLng(45.812231, 15.920618),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false
        };

        marker.infobox = new InfoBox(myOptions);
        marker.infobox.isOpen = false;
        markers.push(marker);

        // action        
        google.maps.event.addListener(marker, "click", function (e) {
            var curMarker = this;

            $.each(markers, function (index, marker) {
                if (marker !== curMarker) {
                    marker.infobox.close();
                    marker.infobox.isOpen = false;
                }
            });

            if (curMarker.infobox.isOpen === false) {
                curMarker.infobox.open(map, this);
                curMarker.infobox.isOpen = true;
                map.panTo(curMarker.getPosition());
            } else {
                curMarker.infobox.close();
                curMarker.infobox.isOpen = false;
            }

        });

        if (myLocationEnabled) {
            var controlDiv = document.createElement('div');
            controlDiv.index = 1;
            map.controls[google.maps.ControlPosition.RIGHT_TOP].push(controlDiv);
            HomeControl(controlDiv, map)
        }
    }
}