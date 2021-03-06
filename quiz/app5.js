
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Resultado</h1>";
  
    gameOverHTML += "<h2 id='score'> Tu puntage es de: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;

        
//ENVIAR PUNTAJE A FIRESTORE
var user = firebase.auth().currentUser;
if (user != null) {
    var name = user.displayName;
    var email = user.email;
    var photoUrl = user.photoURL;
    var emailVerified = user.emailVerified;
    var uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                     // this value to authenticate with your backend server, if
                     // you have one. Use User.getToken() instead.
  
  }


  console.log(email)

  var docRef = fs.collection(email).doc("puntajegeneral");

docRef.get().then(function(doc) {
     
          const puntaje = doc.data();
          
       
          fs.collection (email).doc("puntajegeneral").set({
            puntaje1: puntaje.puntaje1,
            puntaje2: puntaje.puntaje2,
            puntaje3: puntaje.puntaje3,
            puntaje4: puntaje.puntaje4,
            puntaje5: puntaje.puntaje5,
            puntaje6: puntaje.puntaje6,
            puntaje7: puntaje.puntaje7,
            puntaje8: puntaje.puntaje8,
            puntaje9: puntaje.puntaje9,
            puntaje10: quiz.score
           

        });
        
        });



};

// CREAR LAS PREGUNTAS
var questions = [
    new Question("1. Por cada litro de gasolina que se consume se produce:", ["?? de kilo de di??xido de carbono", "C??  kilo de di??xido de carbono","2,3 kilos de di??xido de carbono", "3 kilos de di??xido de carbono"], "2,3 kilos de di??xido de carbono"),
    new Question("2. Los gases contaminantes se clasifican en", ["Transitorios y permanentes", "Primarios y secundarios", "T??xicos y no t??xicos", "Alcalinos y no alcalinos"], "Primarios y secundarios"),
    new Question("3. Una condici??n adversa mental es:", ["Problema de visi??n", "Temeridad","Lluvia", "Fatiga"], "Temeridad"),
    new Question("4. El proceso de la conducci??n en el que Intervienen los est??mulos y las experiencias previas, se denomina", ["Intelecci??n", "Percepci??n", "Volici??n", "Homeostasis"], "Intelecci??n"),
    new Question("5. A la acci??n de trasladarse de un lugar a otro, se le define como", ["Tr??nsito", "Transporte", "Traslado", "Circulaci??n"], "Tr??nsito"),
    new Question("6. Si la curva se dirige hacia la derecha, el peralte debe construirse", ["Al centro", "A la derecha ", "A la izquierda", "A ambos lados"], "A la izquierda"),
    new Question("7. Las condiciones adversas f??sicas se pueden clasificar en", ["Primarias y secundarias", "Peligrosas y pasivas", "Transitorias y permanentes", "Restrictivas y t??cnicas"], "Transitorias y permanentes"),
    new Question("8. Los tipos de v??a que encontramos en Costa Rica, son", ["Autopistas y transito lento", "Urbanas y rurales", "Primarias y secundarias", "Principales y terciarias"], "Urbanas y rurales"),
    new Question("9. El proceso de la conducci??n en el que act??an nuestros sentidos, es", ["Percepci??n", "Intelecci??n", "Volici??n", "Homeostasis"], "Percepci??n"),
    new Question("10. Si deseo abandonar la rotonda por la tercera salida debo circular por el carril:", ["Externo", "Paralelo", "Interno", "Central"], "Interno")

    
];

const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    location.href="../autuser/login.html";

    console.log("signup out");
  });
});

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();



