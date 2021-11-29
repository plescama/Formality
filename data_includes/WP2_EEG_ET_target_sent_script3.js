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
    .settings.center()
    .print()
,

newButton("Weiter","Weiter")
    .settings.center()
    .settings.css("font-family", "calibri").settings.css("font-size", "12px")
    .print()              
    .wait(
        getHtml("Consent").test.complete()
            .failure(getHtml("Consent").warn())    
    )
    )



//// DEMOGRAPHICS ==============================================================
PennController("demographics",
    
    
    
    newText("demo", "<p><small><i> Bevor wir mit dem Experiment anfangen, brauchen wir noch einige Informationen von Dir. Alle personenbezogenen Angaben werden anonymisiert gespeichert und eine sp&auml;tere Zuordnung der angegebenen Daten"
                +" zu Versuchspersonen wird den Forschenden nicht mehr m&ouml;glich sein.Wenn Du fertig bist, klicke bitte auf 'Fortsetzen'.</i></small><p>")  
               .settings.css("font-size", "20px")
               .settings.center()
               ,
               newCanvas("democanvas", 1000,115)
               .settings.add(0,0, getText("demo"))
               .settings.center()
               .print()
               ,
               newDropDown("age", "Bitte eine Option ausw&auml;hlen")
               .settings.add("18" , "19" , "20", "21" , "22" , "23", "24" , "25" , "26", "27" , "28" , "29", "30" , "+31")
               .settings.log()
               
               ,
               newText("agetext", "1. Alter:")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newCanvas("agecanvas", 1000, 40)
               .settings.add(0,0,getText("agetext"))
               .settings.add(450,2, getDropDown("age"))
               .settings.center()
               .print()
               ,
               newText("sex", "2. Geschlecht:")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newDropDown("sex", "Bitte eine Option ausw&auml;hlen")
               .settings.add("weiblich", "m&auml;nnlich", "divers")
               .settings.log()
               ,
               newCanvas("sexcanvas", 1000, 40)
               .settings.add(0, 0, getText("sex"))
               .settings.add(450,3, getDropDown("sex"))
               .settings.center()
               .print()
               ,
               newText("abschluss", "3. H&ouml;chster Bildungsabschluss:")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newDropDown("abschluss", "Bitte eine Option ausw&auml;hlen")
               .settings.add("Ich bin von der Schule abgegangen ohne Hauptschulabschluss","Haupt-/Volksschulabschluss","Abitur oder gleichwertiger Abschluss","Realschulabschluss (Mittlere Reife) oder gleichwertiger Abschluss","Fachhochschulreife","Allgemeine oder fachgebundene Hochschulreife/Abitur", "Ausbildung", "Akademischer Abschluss (Fachhochschulabschluss, Diplomabschluss, Hochschulabschluss)")     // MAYBE ADD QUESTIONS ABOUT DIALECT AND DOMINANT HAND
               .settings.size(191,20)
               .settings.log()
               ,
               newCanvas("abschlusscanvas", 1000, 40)
               .settings.add(0, 0, getText("abschluss"))
               .settings.add(450,4, getDropDown("abschluss"))
               .settings.center()
               .print()
               ,
               newText("Leiter","<b>4.</b> Stelle Dir vor, <b>die Leiter</b> (s. unten) repr&auml;sentiert den relativen Sozialstatus der Menschen in Deutschland. "
                       +"An der Spitze der Leiter stehen Menschen mit relativ hohem Status – diejenigen, die das meiste Geld, die beste Bildung und die angesehensten Arbeitspl&auml;tze haben. Ganz unten sind Menschen mit relativ niedrigem Status – beispielsweise als arbeitslos Gemeldete. Relativ weit unten zu verorten w&auml;ren auch diejenigen, die nur wenig Geld verdienen, einen niedrigen Bildungstand haben, und / oder Berufe aus&uuml;ben, die die Gesellschaft als eher wenig respektabel ansieht."
                       +"<br> Wo w&uuml;rdest Du Dich auf dieser Leiter einordnen? W&auml;hle bitte die Sprosse, die Deinem empfundenen Sozialstatus am ehesten entspricht.")
               .settings.css("font-size", "18px")
               ,
               newDropDown("leiter", "Bitte eine Option ausw&auml;hlen")
               .settings.add("A", "B", "C","D", "E", "F","G", "H", "I","J")
               .settings.log()
               ,
               newImage("leiter", "https://amor.cms.hu-berlin.de/~patarroa/Leiter.jpeg")
               .settings.size(200,300)
               ,
               newCanvas("leitercanvas", 1000,20)
               .settings.add(0, 10, getText("Leiter"))
               .settings.center()
               .print()
               ,
               newCanvas("leitercanvas2", 1000,350)
               .settings.add(350,150, getImage("leiter"))
               .settings.add(650,300, getDropDown("leiter"))
               .settings.center()
               .print()
               ,
               newText("degeboren", "5. Bist Du in Deutschland geboren?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newDropDown("degeboren", "Bitte eine Option ausw&auml;hlen")
               .settings.add("Ja", "Nein")
               .settings.log()
               .settings.size(200,40)
               ,
               newCanvas("degeboren", 1000,200 )
               .settings.add(0, 170, getText("degeboren"))
               .settings.add(400,170,getDropDown("degeboren"))
               .settings.center()
               .print()
               ,
               newText("native", "<b>6. Mit welcher Sprache bist Du zuhause aufgewachsen?</b><br><small>(ggf. Falls Du A, D, F oder G ausgewählt hast, schreibe bitte auf, mit welchen Dialekten Du aufgewachsen bist)</small>")
               .settings.css("font-size","18px")
         
               ,
               newTextInput("native_dialekt", "")
               .settings.size(200,40)
               .settings.log()
               .settings.hidden()
               ,
               newText("native_dialekt_input", "")
               .settings.after(getTextInput("native_dialekt"))
               ,
               newDropDown("language", "Bitte eine Option ausw&auml;hlen")
               .settings.add("A. Dialekt", "B. Umgangssprache", "C. Gepflegtes Hochdeutsch", "D. Alle", "E. B und C", "F. A und C", "G. A und B")
               .settings.size(200,40)
               .settings.log()
               .settings.after(getText("native_dialekt_input"))
               .settings.callback(
                   getDropDown("language")
                   .test.selected("A. Dialekt")
                   .success(getTextInput("native_dialekt").settings.visible())
                   //    .failure(getTextInput("dialekt").settings.hidden())
                   
                   .test.selected("B. Umgangssprache")
                   .success(getTextInput("native_dialekt").settings.hidden())
                   
                   .test.selected("C. Gepflegtes Hochdeutsch")
                   .success(getTextInput("native_dialekt").settings.hidden())
               
                   .test.selected("D. Alle")
                   .success(getTextInput("native_dialekt").settings.visible())
                   //      .failure(getTextInput("dialekt").settings.hidden())
                   
                   .test.selected("E. B und C")
                   .success(getTextInput("native_dialekt").settings.hidden())
                   
                   .test.selected("F. A und C")
                   .success(getTextInput("native_dialekt").settings.visible())
                   // .failure(getTextInput("dialekt").settings.hidden())
                   
                   .test.selected("G. A und B")
                   .success( getTextInput("native_dialekt").settings.visible())
                   //  .failure(getTextInput("dialekt").settings.hidden())
                   )
        
               ,
               newCanvas("languagecanvas", 1000,60)
              .settings.add(0, 40, getText("native"))
              .settings.add(680,40, getDropDown("language"))
              .settings.center()
              .print()
               
               ,
               newText("current", "<b>7. Welche Sprache sprichst Du aktuell haupts&auml;chlich?</b><br><small>(ggf. Falls Du A, D, F oder G ausgewählt hast, schreibe bitte auf, welche Dialekte Du verwendest)</small>")
               .settings.css("font-size", "18px")

               ,
               newTextInput("current_dialekt", "")
               .settings.log()
               .settings.size(200,40)
               .settings.hidden()
               ,
               newText("current_dialekt_input", "")
               .settings.after(getTextInput("current_dialekt"))
               ,
               newDropDown("current_dial", "Bitte eine Option ausw&auml;hlen")
               .settings.add("A. Dialekt", "B. Umgangssprache", "C. Gepflegtes Hochdeutsch", "D. Alle", "E. B und C", "F. A und C", "G. A und B")
               .settings.log()
               .settings.size(200,40)
               .settings.after(getText("current_dialekt_input"))
               .settings.callback(
                   
                   getDropDown("current_dial")
                   .test.selected("A. Dialekt")
                   .success(getTextInput("current_dialekt").settings.visible())
                  
                  
                   .test.selected("B. Umgangssprache")
                   .success(getTextInput("current_dialekt").settings.hidden())
                   
                   .test.selected("C. Gepflegtes Hochdeutsch")
                   .success(getTextInput("current_dialekt").settings.hidden())
              
                   .test.selected("D. Alle")
                   .success(getTextInput("current_dialekt").settings.visible())
                 
                   
                   .test.selected("E. B und C")
                   .success(getTextInput("current_dialekt").settings.hidden())
                   
                   .test.selected("F. A und C")
                   .success(getTextInput("current_dialekt").settings.visible())
                  
                   
                   .test.selected("G. A und B")
                   .success( getTextInput("current_dialekt").settings.visible())
                   

               )
               ,
               newCanvas("current_dialekt_canvas", 1000, 60)
               .settings.add(0, 40, getText("current"))
               .settings.add(680,40, getDropDown("current_dial"))
               .settings.center()
               .print()   
               ,
               newText("dialectcomp", "<b>8. Wenn Du einen Dialekt sprichst, wie gut kannst Du ihn sprechen/verstehen?</b><br><small>(Skala von 0 - 'gar nicht' bis 100 'ausgezeichnet')</small>")
               .settings.css("font-size", "18px")
               ,
               newTextInput("dial_comp", "")
               .log()
               .size(200, 40)
               .print()
               ,
               newCanvas("dial_comp_canv", 1000, 60)
               .settings.add(0, 40, getText("dialectcomp"))
               .settings.add(680,30, getTextInput("dial_comp"))
               .settings.center()
               .print()   
               ,
               newText("hochsprcomp", "<b>9. Wie gut sprichst und verstehst Du Hochdeutsch?</b><br><small>(Skala von 0 - 'gar nicht' bis 100 'ausgezeichnet')</small>")
               .settings.css("font-size", "18px")
               ,
               newTextInput("hoch_comp", "")
               .settings.log()
               .lines(0)
               .size(200, 40)
               .print()
               ,
               newCanvas("hoch_comp_canv", 1000, 60)
               .settings.add(0, 40, getText("hochsprcomp"))
               .settings.add(680,30, getTextInput("hoch_comp"))
               .settings.center()
               .print()   
               ,        
               newText("<p> ,<br>")
               .print()
               ,
               newButton("continue", "Weiter")
               .settings.css("font-family", "times-new").settings.css("font-size", "14px")
               .settings.center()
               .settings.log()
               .print()
               .wait(
            newFunction('dummy', ()=>true).test.is(true)
            // age
            .and( getDropDown("age").test.selected()
                    .failure( newText('errorage', "Bitte gib Dein Alter an.").color("red").print() )
            // sex
            ).and( getDropDown("sex").test.selected()
                    .failure( newText('errorsex', "Bitte gib Dein Geschlecht an.").color("red").print() )
            // language
            ).and( getDropDown("language").test.selected()
                    .failure( newText('langerror', "Bitte antworte auf die Frage bez&uuml;glich Deines sprachlichen Hintergrunds.").color("red").print() )
            // current dialect
            ).and( getDropDown("current_dial").test.selected()
                    .failure( newText('dialecterr', "Bitte antworte auf die Frage bez&uuml;glich Deines sprachlichen Hintergrunds").color("red").print() )
            // abschluss
            ).and( getDropDown("abschluss").test.selected()
                   .failure( newText('abschlusserr', "Bitte antworte auf die Frage bez&uuml;glich Deines Abschlusses.").color("red").print() )
          
            ).and(getDropDown("leiter").test.selected()
                   .failure( newText('leitererr', "Bitte gib eine Variante an.").color("red").print() )
            
            ).and(getDropDown("degeboren").test.selected()
                    .failure( newText('degeborenerr', "Bitte gib Informationen &uuml;ber deine Herkunft an").color("red").print() )
               
            ).and(
              getTextInput("native_dialekt").test.printed()

               .success(getTextInput("native_dialekt")
                        .test.text(/^.*/) // testing if at 0 or more words were written in the input box
                         .failure(
                             newText("dialekterr","Bitte gib Informationen &uuml;ber die Sprache, mit der Du aufgewachsen bist.")
                             .settings.color("red")
                             .print() )
           
                ) //end success 
            
            
            ).and(
             getTextInput("current_dialekt").test.printed()
              .success(getTextInput("current_dialekt")
              .test.text(/^.*/)  // testing if at 0 or more words were written in the input box
              .failure(
                   newText("dialekterr1","Bitte gib Informationen &uuml;ber Deinen aktuellen Sprachverbrauch an")
                   .settings.color("red")
                   .print())
            ) //success
            ).and(
             getTextInput("hoch_comp").test.text(/^.+/) // testing if at least one digit was written in the input box
                .failure(
                   newText("dialekterr2","Bitte gib Informationen &uuml;ber Deine Hochsprache-Kompetenz an")
                   .settings.color("red")
                   .print())
            ).and(
            getTextInput("dial_comp").test.text(/^.+/) // testing if at least one digit was written in the input box
                   .failure(
                   newText("dialekterr3","Bitte gib Informationen &uuml;ber Deine Dialekt-Kompetenz an")
                   .settings.color("red")
                   .print())
                   
            )  )
               
             
               ,     
               getDropDown("age").wait("first")
               ,
               getDropDown("sex").wait("first")
               ,
               getDropDown("language").wait("first")
               ,
               getDropDown("current_dial").wait("first")
               ,
               getDropDown("leiter").wait("first")
               ,
               getDropDown("abschluss").wait("first")
               ,
               getDropDown("degeboren").wait("first")
               ,
               
              
               getButton("continue")
               .remove()
               
               ,
               newText("<p>")
               .print()  
    
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
