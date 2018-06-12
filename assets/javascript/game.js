// This is a basic Word Game.
// Future enhancements include
// Theme selection to allow selecting a range of word categories along with image and description as hints
// Better navigation/side bar function
// Hangman graphics
// Pseudo Code
// create an array object of questions: This array should contain Question, Choice of answers, correct answer

    $(document).ready(function(){
        var quizzArray  = [
            {
                question:"In which city was the Titanic launched?",
                ch1:"1. Belfast",
                ch2:"2. Bangot",
                ch3:"3. Bradford",
                ch4:"4. Birmingham",
                ans:"1. Belfast"
            },
            {
                question:"What is the most widely spoken language in Brazil?",
                ch1:"1. English",
                ch2:"2. Spanish",
                ch3:"3. Portugese",
                ch4:"4. French",
                ans:"3. Portugese"
            },
            {
                question:"What does the white dove symbolizes?",
                ch1:"1. Riot",
                ch2:"2. Peace",
                ch3:"3. Anarchism",
                ch4:"4. War",
                ans:"2. Peace"
            },
            {
                question:"Who is Shrek's wife?",
                ch1:"1. Thelonious",
                ch2:"2. Belle",
                ch3:"3. Rupenzel",
                ch4:"4. Fiona",
                ans:"4. Fiona"
            },
            {
                question:"What is the first letter of Greek alphabet?",
                ch1:"1. Alpha",
                ch2:"2. Beta",
                ch3:"3. Gamma",
                ch4:"4. Delta",
                ans:"1. Alpha"
            },
            {
                question:"How many milligrams make a gram?",
                ch1:"1. 250",
                ch2:"2. 500",
                ch3:"3. 1000",
                ch4:"4. 10000",
                ans:"3. 1000"
            },
            {
                question:"Who is the world's fastest land animal?",
                ch1:"1. Horse",
                ch2:"2. Cheetah",
                ch3:"3. Zebra",
                ch4:"4. Elephant",
                ans:"2. Cheetah"
            },
            {
                question:"Who is the worl's largest animal?",
                ch1:"1. Giraffe",
                ch2:"2. Lion",
                ch3:"3. Elephant",
                ch4:"4. Rhino",
                ans:"3. Elephant"
            },
            {
                question:"Which bird has the largest wingspan?",
                ch1:"1. Crow",
                ch2:"2. Peacock",
                ch3:"3. Albatross",
                ch4:"4. Hawk",
                ans:"3. Albatross"
            },  
            {
                question:"From which language did the word 'Ketchup' come?",
                ch1:"1. Chinese",
                ch2:"2. Japanese",
                ch3:"3. Italian",
                ch4:"4. Portugese",
                ans:"1. Chinese"
            },                      
        ]
        var maxnumquestion = parseInt(Object.keys(quizzArray).length);
        var maxquestionindx = parseInt(maxnumquestion) - 1;
        var quizz = "";
        var timecount = 0;
        var timeleft = 20;
        var qnum = 0;
        var numCorrect = 0;
        var numWrong = 0;
        var nonAttempt = 0;
        var timeout=0;
        var timeint=0;
        var gameControlFlag = "0";

        //Initial Load
        function initialLoad(){
            console.log("Initial Load");
            $(".questionanswersection").css("display", "none");
            $("#timeremain").text("00:00");
        }

        //Function to start the quizz game when Start button is clicked
        function quizzStart(){

            gameControlFlag = "0";
            gameFinished = false;
            qnum = 0;
            numCorrect = 0;
            numWrong = 0;
            nonAttempt = 0;
            $("#timeremain").text("00:00");
            loadQuestion(0);

            //console.log("Start Time Interval=" + timeint);
            var curTime=convertSeconds();
            $(".gameStart").css("display", "none");
            $(".questionanswersection").css("display", "block");
            $(".quizzresult").css("display", "none");
        
        }

        
        function loadQuestion(qnum){
        
            //alert("Max number of Question" + maxnumquestion);
            console.log("Control Status= " + gameControlFlag + "for Question " + qnum);

            if (gameControlFlag === "6"){
                clearInterval(timeint);
                $("#quizzstatus1").text("");
                $("#quizzstatus2").text("");

                setTimeout(function(){

                },10000);
                $("#quizzstatus1").text("Game Over!!!");
                $("#quizzstatus2").text("");
                $("#quizzstatus3").text("Number of Correct Answers   = " + numCorrect);
                $("#quizzstatus4").text("Number of Incorrect Answers = " + numWrong);
                $("#quizzstatus5").text("Number questions skipped    = " + nonAttempt);
                $(".questionanswersection").css("display", "none");
                $(".quizzresult").css("display", "block");
                $(".gameStart").css("display", "block");
            }
            else 
                {
                console.log("Qn Number =" + parseInt(qnum) + 1 + " & Max numn= " + maxquestionindx );
                if (qnum <= maxquestionindx){
                //Loading the Question and answer choices
                quizz = quizzArray[qnum];
                console.log("Qn Number= " + parseInt(qnum) + 1);
                var quest = quizz.question;
                var ch1 = quizz.ch1;
                var ch2 = quizz.ch2;
                var ch3 = quizz.ch3;
                var ch4 = quizz.ch4;
               var ans = quizz.ans;
                $("#quizzstatus1").text("");
                $("#quizzstatus2").text("");
                $(".questionstyle").text(quest);
                $("#bttn1").text(ch1);
                $("#bttn2").text(ch2);
                $("#bttn3").text(ch3);
                $("#bttn4").text(ch4);

                //Loading the progress count here
                var questionnumber = qnum +1 ;
                $("#questioncount").text("Question " + questionnumber + " of " + maxnumquestion );

                //Seting the time interval for this questions
                clearInterval(timeint);
                clearTimeout();
                timecount = 0;
                timeleft = 20;
                timeint = setInterval(timeIt,1000);
                var curTime=convertSeconds();
                }
            }
        }
 
        //Answer Selection logic
        //function selectChoice(bttn, BtnVal){
        function selectChoice(){
            var btnvalue = $(this).text();

            if (btnvalue === quizz.ans){
                //alert("YOU ARE CORRECT!!!");
                $("#quizzstatus1").css("display", "block");
                $("#quizzstatus2").css("display", "block");
                $("#quizzstatus1").text("Your Answer is Correct!!!");
                $("#quizzstatus2").text("Congratulations!!!");
                $(".quizzresult").css("display", "none");
                clearInterval(timeint);
                setTimeout(function(){
                    console.log("Answer Correct for Question # " + qnum);
                    gameControlFlag = "1";                
                    numCorrect++;
                    console.log("Answer Correct for Question # " + qnum + "&" + maxquestionindx);
                    if (qnum >= maxquestionindx){
                        gameControlFlag = "6";
                    }
                    qnum++;
                    loadQuestion(qnum);
                }, 5000);
            }
            else{
                //alert("YOU ARE WRONG!!!");
                $("#quizzstatus1").css("display", "block");
                $("#quizzstatus2").css("display", "block");
                $("#quizzstatus1").text("Your Answer is Wrong!!!");
                $("#quizzstatus2").text("Correct Answer is " + quizz.ans);
                $(".quizzresult").css("display", "none");
                clearInterval(timeint);
                setTimeout(function(){
                    console.log("Answer Correct for Question # " + qnum);
                    gameControlFlag = "2";                
                    numWrong++;
                    console.log("Answer InCorrect for Question # " + qnum + "&" + maxquestionindx);
                    if (qnum >= maxquestionindx){
                        gameControlFlag = "6";
                    }
                    qnum++;
                    loadQuestion(qnum);
                }, 5000);
            }
        }
        //Timer functions
        function convertSeconds(s){
            var min = Math.floor(s/60);
            var sec = s%60;
            if (min < 10) min = "0"+ min;
            if (sec < 10) sec = "0"+ sec;
            var disptime = min + ":" + sec;
            return disptime;
        }
        
        //Timer Logic
        function timeIt(){
            timecount++;
            //console.log("time= " + timecount);
            var timeDisp = convertSeconds(timeleft-timecount);
            $("#timeremain").text(timeDisp);

            //Check if Time is Up?
            if (timecount === timeleft){
                //timecount = 0;
                console.log("Qnum, Max Question " + qnum + " + " + maxnumquestion);
                $("#quizzstatus1").css("display", "block");
                $("#quizzstatus2").css("display", "block");
                $("#quizzstatus1").text("Your Time is Up!!!");
                $("#quizzstatus2").text("Correct Answer is " + quizz.ans);
                $(".quizzresult").css("display", "none");   
                clearInterval(timeint);
                setTimeout(function(){
                    console.log("Answer Correct for Question # " + qnum);
                    gameControlFlag = "5";                
                    nonAttempt++;
                    console.log("Answer InCorrect for Question # " + qnum + "&" + maxquestionindx);
                    if (qnum >= maxquestionindx){
                        gameControlFlag = "6";
                    }
                    qnum++;
                    loadQuestion(qnum);
                }, 5000);   
            }
            else{
                if (qnum > maxquestionindx){
                    console.log("Max reached...");
                    gameControlFlag = "6";
                    gameFinished = true;
                    qnum = 0;
                    loadQuestion(qnum); 
                }
            }
        }
        
        function clearStatus(){
            //console.log("Waiting after timeout");
            $("#quizzstatus1").text("");
            $("#quizzstatus2").text("");
        }

        //Initial Game Load
        initialLoad();

        //Button click logic
        $("#bttnGameStart").on("click", quizzStart);
        //$(".button-group").on("click", selectChoice);
        $("#bttn1").on("click", selectChoice);
        $("#bttn2").on("click", selectChoice);
        $("#bttn3").on("click", selectChoice);
        $("#bttn4").on("click", selectChoice);
    })
