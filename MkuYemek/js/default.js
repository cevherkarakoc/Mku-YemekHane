// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=329104
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
        }

        var s = Windows.UI.ViewManagement.StatusBar.getForCurrentView();
        s.showAsync(); // shows the statusbar
        var level;
        var networkInfo = Windows.Networking.Connectivity.NetworkInformation;
        var internetProfile = networkInfo.getInternetConnectionProfile();
        if (internetProfile === null) {
            level = 0
        } else {
            level = internetProfile.getNetworkConnectivityLevel();
        }
        

        var currentTime = new Date();
        var dd = currentTime.getDate();
        var mm = currentTime.getMonth() + 1;
        var yyy = currentTime.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if(mm<12){
            mm = '0'+mm;
        }


        var b1 = document.getElementById("b1"),
            b2 = document.getElementById("b2"),
            b3 = document.getElementById("b3"),
            b4 = document.getElementById("b4"),
            bK = document.getElementById("bK"),
            y1 = document.getElementById("y1"),
            y2 = document.getElementById("y2"),
            y3 = document.getElementById("y3"),
            y4 = document.getElementById("y4"),
            yK = document.getElementById("yK");
            

        var bugunURL = "http://mku.edu.tr/read.php?type=5d5b2441309f11dabc5c6298b125c779&fdate="+yyy+"-"+mm+"-"+dd;
        var yarinURL = "http://mku.edu.tr/read.php?type=5d5b2441309f11dabc5c6298b125c779&fdate=" + yyy + "-" + mm + "-" + (dd + 1);
        

        // Call WinJS.xhr to retrieve an XML feed from the Web.
        if (level === 3) {

            WinJS.xhr({
                url: bugunURL,
                responseType: "document"
            }).done(

                // When the result has completed, check the status.
                function completed(result) {
                    if (result.status === 200) {

                        // Get the XML document from the results. 
                        var xmlDocument = result.responseXML;
                        var b1G = xmlDocument.getElementsByTagName('span')[0],
                            b2G = xmlDocument.getElementsByTagName('span')[1],
                            b3G = xmlDocument.getElementsByTagName('span')[2],
                            b4G = xmlDocument.getElementsByTagName('span')[3],
                            bKG = xmlDocument.getElementsByTagName('span')[6];

                        if (!b3G) {
                            b1.innerText = "Üzgünüm";
                            b2.innerText = "Bugün İçin";
                            b3.innerText = "Yemek Kaydı";
                            b4.innerText = "Bulamadım.";
                            bK.innerText = "    :(    ";
                        } else {
                            b1.innerText = b1G.innerText;
                            b2.innerText = b2G.innerText;
                            b3.innerText = b3G.innerText;
                            b4.innerText = b4G.innerText;
                            bK.innerText = bKG.innerText;
                        }

                    }
                });
            
        }
        else {
            var msg = new Windows.UI.Popups.MessageDialog(
                "İnternet bağlantısı bulanamadı.");
            msg.showAsync();
        }
        if (level === 3) {
            WinJS.xhr({
                url: yarinURL,
                responseType: "document"
            }).done(

                // When the result has completed, check the status.
                function completed(result) {
                    if (result.status === 200) {

                        // Get the XML document from the results. 
                        var xmlDocument = result.responseXML;
                        var y1G = xmlDocument.getElementsByTagName('span')[0],
                            y2G = xmlDocument.getElementsByTagName('span')[1],
                            y3G = xmlDocument.getElementsByTagName('span')[2],
                            y4G = xmlDocument.getElementsByTagName('span')[3],
                            yKG = xmlDocument.getElementsByTagName('span')[6];

                        if (!y3G) {
                            y1.innerText = "Üzgünüm";
                            y2.innerText = "Bugün İçin";
                            y3.innerText = "Yemek Kaydı";
                            y4.innerText = "Bulamadım.";
                            yK.innerText = "    :(    ";
                        } else {
                            y1.innerText = y1G.innerText;
                            y2.innerText = y2G.innerText;
                            y3.innerText = y3G.innerText;
                            y4.innerText = y4G.innerText;
                            yK.innerText = yKG.innerText;
                        }
                    }
                });
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    // Change RSS feed URL as you need to.

    app.start();
})();
