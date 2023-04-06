function prePlot() {

    // recup les inputs
    id_nom = document.getElementById('coureur-input');
    nom = id_nom.value;
    id_annee = document.getElementById('annee-input');
    annee = id_annee.value;

    // recup l'année
    switch (annee) {
        case '2018':
            tab_auto = tab_autocomplete_2018;
            tab_gen = tab_general_2018;
            break;
        case '2019':
            tab_auto = tab_autocomplete_2019;
            tab_gen = tab_general_2019;
            break
        default:
            console.log(`${annee} n'est pas une donnée disponible.`);
    }

    // recup la clé
    key = 0;
    for ( i=0; i<tab_auto.length; i++) {
        if ( tab_auto[i][0] == nom ){
            key = tab_auto[i][1];
            break;
        }
    }

    // verif si l'input est valide
    if ( key == 0 ) {
        document.getElementById('coureur-input-error').innerHTML = 'pas de coureur à ce nom';
    } else {
        document.getElementById('coureur-input-error').innerHTML = '';
        var tab = new Array();
        for ( i=0; i<tab_gen.length; i++) {
            if ( tab_gen[i][1] == key ) {
                tab.push(tab_gen[i][2]);
            }
        }

        tab_stats = stats(tab);

        addPlot(tab, nom + ' ' + annee);

        console.log(nom);
        console.log(`Moy = ${tab_stats[2]}`);
        console.log(`Min = ${tab_stats[0]}`);
        console.log(`Max = ${tab_stats[1]}`);
    }

}

function stats(tab) {
    tab_stats = new Array();

    //Mini
    var min_sec = tab[0];
    for(var i = 1; i < tab.length; i++) {
        var currenti = tab[i];
        if(currenti < min_sec) {
            min_sec = tab[i];
        }
    }

    //Max
    var max_sec = tab[0];
    for(var i = 1; i < tab.length; i++) {
        var currenti = tab[i];
        if(currenti > max_sec) {
            max_sec = tab[i];
        }
    }

    //Moy
    somme = 0
    for ( i=0; i<tab.length; i++) {
        somme = somme + tab[i];
    }

    moy_sec = somme/i+1

    mini = secToTime(min_sec);
    maxi = secToTime(max_sec);
    moye = secToTime(moy_sec);

    tab_stats.push(mini);
    tab_stats.push(maxi);
    tab_stats.push(moye);

    return tab_stats;
}

function secToTime (number) {
    
    min = number/60;
    rest = min%1;
    sec = (rest*60)/100;

    mina = Math.floor(min);
    seca = Math.round(sec*100);             // ou Math.floor si on met les ms à la ligne suivante
    //mila = Math.round((sec*10000)-seca*100)
    time = '00:'+ mina + ':' + seca;        // ajouter + ',' + mila si on met les ms à la ligne precedente

    return time;
}