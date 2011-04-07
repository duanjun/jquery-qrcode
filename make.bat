@ECHO OFF

ECHO Cleaning up old build..
rmdir /S /Q ".tmp"
del jquery.qrcode.min.js

if /i "%1" == "clean" goto DONE

ECHO Remaking Directories...
mkdir ".tmp"

ECHO Combining jQuery core and necessary plugins into a single file...
copy /b "src\qrcode.js"+"src\jquery.qrcode.js" ".tmp\jquery.qrcode.js"

ECHO Compressing Javscript...
if /i "%1" == "debug" (copy ".tmp\jquery.qrcode.js" "jquery.qrcode.min.js") else (java -jar yuicompressor-2.4.2.jar ".tmp\jquery.qrcode.js" -o "jquery.qrcode.min.js")

:DONE

ECHO Done!
