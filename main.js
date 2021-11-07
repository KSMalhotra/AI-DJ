    song="";
    scoreRightwrist=0;
    scoreLeftWrist=0;

    leftWristX=0;
    leftWristY=0;
    RightWristX=0;
    RightWristY=0;

    function preload(){
        song = loadSound("music.mp3");
    }

    function setup()
    {
        canvas = createCanvas(600, 500);
        canvas.center();

        video = createCapture(VIDEO);
        video.hide();

        poseNet= ml5.poseNet(video, modelLoaded);
        poseNet.on('poses', gotPoses);
    }

    function modelLoaded(){
        console.log("Posenet is initialized");
    }

    function draw()
    {
        image(video, 0, 0, 600, 500);

        fill('#ff0000');
        stroke('#ff0000');

    if (scoreLeftWrist>0.2)
    {
        circle(RightWristY, RightWristX, 20);

        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY=Number(leftWristY);
        remove_decimal=floor(InNumberleftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML= "Volume=" + volume;
        song.setVolume(volume);

        if (RightWristY > 0 && RightWristY <= 100){
            document.getElementById("speed").innerHTML= "Speed"= "0.5x";
            song.rate(0.5);
        }
    
        else if (RightWristY > 100 && RightWristY <= 200){
            document.getElementById("speed").innerHTML= "Speed"= "1x";
            song.rate(1);
        }
    
        else if (RightWristY > 200 && RightWristY <= 300){
            document.getElementById("speed").innerHTML= "Speed"= "1.5x";
            song.rate(1.5);
        }
    
        else if (RightWristY > 300 && RightWristY <= 400){
            document.getElementById("speed").innerHTML= "Speed"= "2x";
            song.rate(2);
        }
    
        else if (RightWristY > 400 && RightWristY <= 500){
            document.getElementById("speed").innerHTML= "Speed"= "2x";
            song.rate(2);
        }
    
    }
    }

    

    function play()
    {
        song.play();
        song.setVolume(1);
        song.rate(1);
    }

    function gotPoses(results){
    if (results.length>0)
    {
        console.log(results);
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist="+ scoreLeftWrist + "scoreRightWrist" + scoreRightWrist);

        scoreRightWrist= results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist="+ scoreRightWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX=" + leftWristX +"leftWristY=" +leftWristY);

        RightWristX=results[0].pose.leftWrist.x;
        RightWristY=results[0].pose.leftWrist.y;
        console.log("RightWristX=" + RightWristX +"RightWristY=" +RightWristY);

    }
    }