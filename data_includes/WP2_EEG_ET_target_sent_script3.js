// ======================================== //
//// SFB C03 WP2 EEG TARGET WORDS PRETEST ////
// ======================================== //

//// DEFINE PICK-FUNCTION ============

// This function simply picks a number of trials from a fully randomized set of trials, 
// and then picks another chunk of trials from that same set. The trick here is that 
// you’ll store the set in a variable, so you can reference it when you call pick again, 
// instead of recreating a brand new set with randomize("ListeW").

function Pick(set,n) {
    assert(set instanceof Object, "First argument of pick cannot be a plain string" );
    n = Number(n);
    if (isNaN(n) || n<0) n = 0;
    this.args = [set];
    set.remainingSet = null;
    this.run = function(arrays){
        if (set.remainingSet===null) set.remainingSet = arrays[0];
        const newArray = [];
        for (let i = 0; i < n && set.remainingSet.length; i++)
            newArray.push( set.remainingSet.shift() );
        return newArray;
    }
}
function pick(set, n) { return new Pick(set,n); } 


//// SEQUENCE =========================
PennController.ResetPrefix(null);
PennController.Sequence("welcome", 
                        "demographics", 
                        "instruction", 
                        "exampleinstruction", 
                        "example", 
                        "introduction",
                        pick(liste=randomize("WP2_EEG_ET_target_sent3"), 13),"attentionCheck1",
                        pick(liste, 13),"break",
                        pick(liste, 12),"attentionCheck2",
                        pick(liste, 12), 
                       "send", "final")
    
//PennController.DebugOff()

var progressBarText = "Fortschritt";    
    
/////// WELCOME ======================================

PennController("welcome",

       defaultText
            .print()
    ,
    
        newText("text1", "<h2>Herzlich willkommen!</h2>")
        .settings.center()
        .settings.css("font-size", "large")

        ,
        newText("text3", "Danke, dass Du Dir die Zeit nimmst, an diesem Experiment teilzunehmen. Es wird darum gehen, Sätze zu bewerten. <br> Bevor es losgeht, brauchen wir noch ein paar Informationen von Dir.</br>")
        .settings.center()
        .settings.css("font-size", "large")

        ,
         newText("please", "<p>Wir bitten Dich darum, das Experiment nur am <b>PC oder Laptop</b> und in <b>Mozilla Firefox</b> oder <b>Google Chrome</b> auszuf&uuml;hren<br> (<b>nicht</b> am Tablet oder Smartphone). Wähle einen ruhigen Platz und lass Dich für die nächsten 10 Minuten bitte nicht stören.</p>")
        .settings.center()
        .settings.css("font-size", "large")
        ,

        newText("text2", "<p>Humboldt Universit&auml;t zu Berlin, Institut f&uuml;r Deutsche Sprache und Linguistik </p>")
        .settings.center()
        .settings.css("font-style","italic")
        ,
        newButton("button1", "Fortsetzen")
            .settings.css("font-family", "calibri").settings.css("font-size", "12px")
            .settings.center()
            .print()
            .wait()
        ,
        getText("text1")
            .remove()
        ,
        getText("text3")
            .remove()
        ,
        getText("please")
        .remove()
        ,
        getText("text2")
        .remove()
        ,
        getButton("button1")
            .remove()
    ,
    
    
    newHtml("Consent", "Consent.html")
    .print()
,

newButton("Weiter","Weiter")
    .settings.css("font-family", "calibri").settings.css("font-size", "12px")
    .print()              
    .wait(
        getHtml("Consent").test.complete()
            .failure(getHtml("Consent").warn())    
    )
    )



//// DEMOGRAPHICS ==============================================================
PennController("demographics",
    newText("DemographicsText", "<p>Wir brauchen einige Angaben zu Deiner Person. Diese werden anonymisiert gespeichert und eine spätere Zuordnung zu Dir wird nicht möglich sein. Bitte nimm Dir beim Ausfüllen der Felder Zeit.<p>")              
        .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
        .settings.italic()

    ,

    newCanvas("infocanvas", 1000, 80)
        .settings.add(0, 0, getText("DemographicsText") )
        .print()
    
    ,
    
    
 newDropDown("age", "")
        .add("18" , "19" , "20", "21" , "22" , "23", "24" , "25" , "26", "27" , "28" , "29", "30" , "31" , "über 31")
        .log()
        .before( newText("Alter", "1. Alter: ").bold().settings.css("margin-right","0.5em") )
        .callback( newText("errorage").remove())
        .print()
       
    ,
    
   newCanvas("filler1", 1,8)
    .print()
   ,
    
    newDropDown("sex","")
        .add("Weiblich","Männlich", "Divers")
        .log()
        .before( newText("Geschlecht", "2. Geschlecht: ").bold().settings.css("margin-right","0.5em") )
        .callback( getText("errorsex").remove() )
        .print()
    ,
    newCanvas("filler2", 1,8)
    .print()
   ,
    
    newDropDown("german", "")
        .add("Ja", "Nein")
        .log()
        .before( newText("Muttersprache", "3. Ist Deutsch Deine Muttersprache? ").bold().settings.css("margin-right","0.5em") )
        .callback( getText("errorgerman").remove() )
        .print()
    ,
    newCanvas("filler4", 1,8)
    .print()
   ,
    
    newDropDown("bilingual", "")
        .add("Ja","Nein")
        .log()
        .before( newText("Bilingualism", "4. Bist Du bilingual aufgewachsen (hast Du vor Deinem 6. Lebensjahr eine andere Sprache als Deutsch gelernt)?").bold().settings.css("margin-right","0.5em") )
        .callback( getText("errorbilingual").remove() )
        .print()
    ,
    
    newCanvas("filler5", 1,8)
    .print()
    
    ,
    
    newDropDown("bildung", "")
        .add("kein Abschluss","Schulabschluss","Abitur oder gleichwertiger Abschluss", "Studium ohne Abschluss","Bachelor", "Master","Promotion", "Ausbildung", "Sonstige")
        .log()
        .before( newText("Bildungsabschluss", "5. Was ist Dein höchster Bildungsabschluss? ").bold().settings.css("margin-right","0.5em") )
        .callback( getText("errorbildung").remove() )
        .print()
    ,
   
    newCanvas("filler7", 1,20)
    .print()
   ,
    
   // newDropDown("nationality", "")
       // .add("Deutsch","Österreichisch", "Schweizerisch", "Italienisch", "Andere")
       // .log()
       // .before( newText("Nationality", "5. Was ist Deine Nationalität? ").bold().settings.css("margin-right","0.5em") )
       // .callback( getText("errornationality").remove() )
       // .print()
   // ,
  // newCanvas("filler6", 1,8)
  // .print()
  // ,
    
    
    newButton("okay", "Weiter")
        .settings.css("font-family", "calibri").settings.css("font-size", "12px")
        .print()
        .wait(
            newFunction('dummy', ()=>true).test.is(true)
            // age
            .and( getDropDown("age").test.selected()
                    .failure( newText('errorage', "Bitte gib Dein Alter an.").color("red").print() )
            // sex
            ).and( getDropDown("sex").test.selected()
                    .failure( newText('errorsex', "Bitte gib Dein Geschlecht an.").color("red").print() )
            // mother tongue
            ).and( getDropDown("german").test.selected()
                    .failure( newText('errorgerman', "Bitte gib an, ob Deutsch Deine Muttersprache ist.").color("red").print() )
            // bilingualism
            ).and( getDropDown("bilingual").test.selected()
                    .failure( newText('errorbilingual', "Bitte gib an, ob Du bilingual aufgewachsen bist.").color("red").print() )
            // nationality
            ).and( getDropDown("bildung").test.selected()
                    .failure( newText('errorbildung', "Bitte gib Deinen Bildungsstand an.").color("red").print() )
          
            )
        )      
        
        
)
    

//// INSTRUCTIONS ===================================================================
    
    PennController("instruction",
        newText("<p> In diesem Experiment werden Dir S&auml;tze zur intuitiven Bewertung angezeigt. </br>Deine Aufgabe besteht darin, die Sätze dahingehend zu bewerten, ob die Sprache eher Umgangssprache oder eher Hochsprache ist.<p>")
            .settings.css("font-size", "18px")
            .print()
        ,
        newText("explanation1", "Stell dafür bitte die Bildschirmgröße Deines Browsers für die Dauer des Experiments auf Vollbildmodus.")
            .settings.css("font-size", "18px")
        ,
        
        newCanvas("infocanvas1", 1000, 20)
            .settings.add(0,0, getText("explanation1"))
            .print()
        ,
        
        newText("explanation2", "<p>Bitte bewerte jeden Satz auf einer Skala von <b>0 (sehr informelle Sprache) bis 50 (sehr formelle Sprache)</b>. </br> Es gibt bei der Bewertung kein Richtig oder Falsch, wir sind nur an Deiner intuitiven Einsch&auml;tzung als Muttersprachler*in interessiert. </br> Bitte denk bei der Beantwortung nicht zu lange nach, sondern bewerte nach Bauchgef&uuml;hl und verwende dabei die Skala um </br> Nuancen Deiner Wahrnehmung zum Ausdruck zu bringen.")
            .settings.css("font-size","18px")
            .print()
            ,
            newCanvas("infocanvas2", 1000, 100)
                .settings.add(0,0, getText("explanation2"))
                .print()
        ,
    
    newText("explanation3","<p><b>Erklärung</b>: Einen Satz, welchen Du beispielsweise in einem Gespräch mit Vorgesetzten benutzen würden, wie etwa „Ich korrigiere das Dokument,“ </br> würdest Du wahrscheinlich als formell bewerten und einen hohen Wert (z.B. 40 oder 42) vergeben. Eine Aussage, wie beispielsweise </br>„Wir checken die Sache nicht,“ würdest Du wahrscheinlich eher als sehr umgangssprachlich bewerten und einen niedrigen Wert (beispielsweise 8 oder 10) </br>vergeben. Welchen exakten Wert auf der Skala Du vergibst bleibt einzig und allein Dir und Deiner sprachlichen Intuition überlassen. </br>Bitte lies jeden der Sätze aufmerksam durch und bewerte dann nach Gefühl.")
            .settings.css("font-size","18px")
        .settings.italic()
        .print()
        ,
        newCanvas("infocanvas3", 1000, 160)
            .settings.add(0,0, getText("explanation3"))
            .print()

    

    ,
    newButton("Weiter")
            .settings.css("font-family","calibri") .settings.css("font-size", "12px")
            .print()
            .wait()
    
    )
 
    
    //// EXAMPLE ==========================
    
   PennController("exampleinstruction",
   newText("<p>Das Experiment dauert ungef&auml;hr 10 Minuten. <br/> Um Dich mit der Aufgabe vetraut zu machen, folgt erst ein Beispiel. </p> Sobald Du auf 'Übung starten' klickst, wechselt Dein Bildschirm in den Vollbildmodus.")
        .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
        .settings.center()
        .print()
    ,
    newCanvas("empty canvas", 1, 40)
          .print()
    ,
    newButton("&Uuml;bung starten")
        .settings.css("font-family", "calibri").settings.css("font-size", "12px")
        .settings.center()
        .print()
        .wait()
   
    ,
    fullscreen ()
    
    )
    
    ////////////////////////////////////
    
    PennController("example",
        newText("Das Moped krachte gegen den Baum.")
            .settings.css("font-size", "25px")
            .settings.center()
            .settings.italic()
            .print()
    ,
    newText("f1","<p>Wie formell / informell sch&auml;tzt Du den Satz ein?<p>")
        .settings.css("font-size","20px")
        .settings.center()
        .print()
        
    ,
    newScale("exampleslider", "0", "1","2","3","4","5","6","7","8","9", "10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40" ,"41","42","43","44","45","46","47","48","49", "50")
    .settings.center()
    .settings.before(newText("informell", "0 <br>(sehr<br/> informell)"))
    .settings.after(newText("formell", "50 <br/> (sehr formell)"))
    .settings.size (1100)
    .settings.labelsPosition("bottom")
    .print()
    .settings.log("last")
    .wait()
    //.remove()
        ,
        
    newCanvas("empty canvas", 1, 30)
          .print()
                                                        
        ,
            newButton("best1", "Best&auml;tigen")
            .settings.center()
            .settings.css("font-family", "calibri").settings.css("font-size", "12px")
            .print()
            .wait()
            .remove()
        ,
        getText("f1")
            .remove()
        ,
        getScale("exampleslider")
            .remove()
        ,
        getButton("best1")
            .remove()
    )
    ////////////////////////
    
    PennController("introduction",
        newText("<p>Das war die Übung. <p>Es folgt nun das Experiment.</p>")
            .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
            .settings.center()
            .print()
    ,
    newText("<p>Viel Spa&szlig;!<p>")
        .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
        .settings.center()
        .print()

    ,
    newButton("Experiment beginnen")
        .settings.css("font-family", "calibri").settings.css("font-size", "12px")
        .settings.center()
        .print()
        .wait()
        );   
   
//// EXPERIMENT ==================================================

    PennController.Template(
    PennController.GetTable("WP2_EEG_ET_target_sent_pretest3.csv"),
        variable => PennController("WP2_EEG_ET_target_sent3",
    
    newText("Sentence", variable.Sentence)
        .settings.css("font-family","times new roman") .settings.css("font-size", "25px")
        .settings.center()
        .settings.italic()
        .print()
    ,
    
    newText("frage","<p> Wie formell / informell sch&auml;tzt Du den Satz ein?<p>")
        .settings.css("font-family","times new roman") .settings.css("font-size", "20px")
        .settings.center()
        .print()
    ,
    newScale("slider", "0", "1","2","3","4","5","6","7","8","9", "10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40" ,"41","42","43","44","45","46","47","48","49", "50")
    .settings.center()
    .settings.before( newText("informell", "0 <br/> (sehr informell)"))
    .settings.after(newText("formell", "50 <br/> (sehr formell)"))
    .settings.size(1100)
    .settings.labelsPosition("bottom")
    .print()
    .settings.log("last")
    .wait()
    //.remove()
        ,
        
        newCanvas("empty canvas", 1, 30)
          .print()
                                                        
        ,
        newButton("best", "Best&auml;tigen")
            .settings.center()
            .settings.css("font-family", "calibri").settings.css("font-size", "12px")
            .print()
            .wait()
            .remove()
        ,
        getText("frage")
            .remove()
        ,
        getScale("slider")
        ,
        getButton("best")
            .remove()
        
   
     )
    
    .log("Item", variable.Item)
    .log("ExpSet",variable.ExpSet)
    .log("Condition", variable.Condition)
    .log("Sentence",variable.Sentence)
    .log("Register", variable.Register)
    .log("Skew", variable.Skew)
        
     );
    
    PennController.SendResults("send");
    
    ////////////////

// BREAK =================================================

PennController( "break" ,
                newText("break_text", "<p><b>Zeit f&uuml;r eine kleine Pause!</b> <br><p>Dr&uuml;cke die Leertaste, um fortzufahren, oder entspann Dich und nimm kurz die Augen vom Bildschirm.<br><p><b>Das Experiment geht nach 20 Sekunden automatisch weiter.</br></b><p>")
                .settings.css("font-family","times new roman") .settings.css("font-size", "20px")
                .settings.center()
                .print()    
                ,
                newTimer("break_timer", 20000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,
                getKey("continue_exp")
                .remove()   
                ,
                newText("instructions_key2", "<br>Drücke die Leertaste, um mit dem Experiment fortzufahren.</br>")
                .settings.css("font-family","times new roman") .settings.css("font-size", "20px")
                .settings.center()
                .print()
                ,
                newKey("continue_Ja", " ")
                .wait()
                ,  
                getText("instructions_key2")
                .remove()                  
                ,
                newTimer(1000)
                .start()
                .wait()             
               )    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//// ATTENTIONCHECKS ======================================

//  Attentioncheck 1
PennController("attentionCheck1",
    newText("attentionCheck1", "Bitte w&auml;hle auf der untenstehenden </br>Skala f&uuml;nfunddrei&szlig;ig aus!")
    .settings.center()
    .settings.bold()
    .settings.css("font-family","times new roman") .settings.css("font-size", "20px")
    .print()
   
     ,
    
    newCanvas("empty canvas", 1, 40)
          .print()
    ,
               
     newScale("attentionslider1","0", "1","2","3","4","5","6","7","8","9", "10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49", "50")
.settings.center()
.settings.size (1100)
.settings.labelsPosition("bottom")
.print()
.settings.log()
.wait()
    , 

newCanvas("empty canvas", 1, 40)
          .print()
    ,
               
     newButton("okay", "Best&auml;tigen")
        .settings.center()
        .settings.css("font-family", "calibri").settings.css("font-size", "12px")
        .print()
        .wait()
        .remove()
    ,
   
    getText("attentionCheck1")
        .remove()
    ,   
    getScale("attentionslider1")
        .remove()
    
    );


// Attentioncheck 2
PennController("attentionCheck2",
    newText("attentionCheck2", "Bitte w&auml;hle auf der untenstehenden </br>Skala f&uuml;nfzehn aus!")
    .settings.center()
    .settings.bold()
    .settings.css("font-family","times new roman") .settings.css("font-size", "20px")
    .print()
   
     ,
    
    newCanvas("empty canvas", 1, 40)
          .print()
    ,
               
     newScale("attentionslider2","0", "1","2","3","4","5","6","7","8","9", "10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49", "50")
.settings.center()
.settings.size (1100)
.settings.labelsPosition("bottom")
.print()
.settings.log()
.wait()
    , 

newCanvas("empty canvas", 1, 40)
          .print()
    ,
               
     newButton("okay", "Best&auml;tigen")
        .settings.center()
        .settings.css("font-family", "calibri").settings.css("font-size", "12px")
        .print()
        .wait()
        .remove()
    ,
   
    getText("attentionCheck2")
        .remove()
    ,   
    getScale("attentionslider2")
        .remove()
    
    );
   
// FINAL ==============================================
    
    PennController("final",
        newText("<p>Vielen Dank f&uuml;r Deine Teilnahme! Die Studie ist hiermit beendet. </p>")
            .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
            .settings.center()
            .print()
        ,
        newText ("<p>Bitte kopiere den folgenden Code und füge ihn in Deinem Clickworker-Formular ein, um die Bezahlung zu erhalten: </p>")
            .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
            .settings.center()
            .print()
        ,
        newText ("<p> 1129GR </p>")
             .settings.css("font-family","times new roman") .settings.css("font-size", "30px")
             .settings.center()
             .print()
        ,
        newText ("<p>Du kannst das Fenster jetzt schließen.")
            .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
            .settings.center()
            .print()
        ,
        newButton("void")
            .wait()
    
        
   )