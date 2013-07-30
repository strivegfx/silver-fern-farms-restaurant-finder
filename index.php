<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/ht5bp.css">

        <!-- mapbox -->
        <link href='//api.tiles.mapbox.com/mapbox.js/v1.2.0/mapbox.css' rel='stylesheet' />
        <!--[if lte IE 8]>
        <link href='//api.tiles.mapbox.com/mapbox.js/v1.2.0/mapbox.ie.css' rel='stylesheet' />
        <![endif]-->

        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        <div class="temp-stuff-header"></div>

        <div class="module-container">

            <div class="user-query">
                I want to see all of the
                <div class="selection pick-cuisine">
                    <span class="swap-txt">pick cuisine</span>
                    <ul>
                        <li class="close"></li>
                        <li data-selection="bistro">Bistro</li>
                        <li data-selection="european">European</li>
                        <li data-selection="french">French</li>
                        <li data-selection="italian">Italian</li>
                        <li data-selection="japanese">Japanese</li>
                        <li data-selection="mediterranean">Mediterranean</li>
                        <li data-selection="seafood">Seafood</li>
                        <li data-selection="steak">Steak</li>
                        <li data-selection="thai">Thai</li>
                        <li data-selection="vietnamese">Vietnamese</li>
                    </ul>
                </div>
                restaurants in
                <div class="selection pick-city">
                    <span class="swap-txt">pick city</span>
                    <ul>
                        <li class="close"></li>
                        <li data-selection="my-location">my location</li>
                        <li data-selection="auckland">Auckland</li>
                        <li data-selection="otago">Otago</li>
                        <li data-selection="christchurch">Christchurch</li>
                        <li data-selection="dunedin">Dunedin</li>
                        <li data-selection="hamilton">Hamilton</li>
                        <li data-selection="hawkes-bay">Hawke's Bay</li>
                        <li data-selection="canterbury">Canterbury</li>
                        <li data-selection="wellington">Wellington</li>
                    </ul>
                </div>
            </div>

            <div class="white-out"></div>

            <div class="shadow top-shadow"></div>

            <div id="map"></div>

            <div class="shadow bottom-shadow"></div>

            <div class="expanded-modules-container clear-fix">

                <a href="#" class="expanded-module">
                    <div class="image" style="background-image: url(img/expanded-img-1.jpg);"></div>
                    <h2>Lorem ipsum dolor sit amet</h2>
                    <span>Cras accumsan eu sem sit amet placerat. Aliquam viverra turpis orci, eu porta lectus sodales sed. Phasellus eget lacinia felis, non malesuada sem.</span>
                    <a class="website"></a>
                    <a class="twitter"></a>
                    <a class="facebook"></a>
                </a>

                <a href="#" class="expanded-module">
                    <div class="image" style="background-image: url(img/expanded-img-2.jpg);"></div>
                    <h2>In vitae tempor massa</h2>
                    <span>Vivamus id suscipit enim. Ut massa libero, venenatis non tortor quis, aliquet ultrices eros. Aliquam vitae velit dolor. Sed rhoncus fermentum lacus.</span>
                    <a class="website"></a>
                    <a class="twitter"></a>
                    <a class="facebook"></a>
                </a>

                <a href="#" class="expanded-module">
                    <div class="image" style="background-image: url(img/expanded-img-3.jpg);"></div>
                    <h2>Donec egestas et purus sed</h2>
                    <span>Quisque vestibulum ullamcorper lorem, sit amet pellentesque ligula vehicula mattis. Etiam pretium ultrices mi. Etiam ultrices egestas nunc, vel sagittis nisl bibendum non.</span>
                    <a class="website"></a>
                    <a class="twitter"></a>
                    <a class="facebook"></a>
                </a>

            </div>

        </div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.9.1.min.js"><\/script>')</script>
        <!--<script src="js/plugins.js"></script>-->

        <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.10.1/TweenMax.min.js"></script>

        <!-- mapbox -->
        <script src='//api.tiles.mapbox.com/mapbox.js/v1.2.0/mapbox.js'></script>

        <!-- google geolocation api -->
        <script type="text/javascript" src="https://www.google.com/jsapi"></script>

        <!-- my code -->
        <script src="js/main.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <!--<script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src='//www.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>-->
    </body>
</html>
