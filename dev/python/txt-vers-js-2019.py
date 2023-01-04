''' 2019 '''
import re

file_read = open("D:/Projects/Chouette/txt/read-2019.txt","r")
list_lines = file_read.readlines()
file_read.close()

for i in range(0, len(list_lines)):
    temp100 = list_lines[i].replace('\n','')
    temp115 = ''
    for j in range (0,3):
        if ( temp100[j] == ' ' ):
            nb = j
    if ( ( temp100[0:nb].isdigit() ) & ( temp100[nb] == ' ' ) ): 
        temp115 = temp100 + '\n'
        try:
            temp120 = temp120 + temp115
        except:
            temp120 = temp115

file_write = open("D:/Projects/Chouette/txt/new-read-2019.txt","w")
file_write.write(temp120)
file_write.close()

file_new_read = open("D:/Projects/Chouette/txt/new-read-2019.txt","r")
list_new_lines = file_new_read.readlines()
file_new_read.close()

tab_initial = list()
new_line = list()
for i in range(0,len(list_new_lines)):
    temp0 = list_new_lines[i]
    temp1 = temp0.replace('Pass. ','')
    temp3 = temp1[0:-11]
    temp4 = temp3.replace('Non','')

    for j in range(0, len(temp4)):
        if ( temp4[j] != ' ' ):
            try:
                temp5 = temp5 + temp4[j]
            except:
                temp5 = temp4[j]
        else:
            new_line.append(temp5)
            temp5 = ''
    tab_initial.append(new_line)
    new_line = list()

tab_general = list()
tab_autocomplete = list()
exp_num = re.compile(r"nÂ°[0-9]")
exp_time = re.compile(r"[0-9]{2}:[0-9]{2}:[0-9]{2}")

for i in range(0,len(tab_initial)):
    line = tab_initial[i]
    nom = ''
    nb_nom = 0
    line_autocomplete = list()
    
    for j in range(1,(len(line)-2)):
        if ( re.match(exp_num,line[j]) ):
            break
        else:
            lenj = len(line[j])
            
            if ( (line[j][(lenj-2):lenj]) == "." ):
                elem = ''
                esp = ''
            else:
                elem = line[j]
                esp = ' '
            
            if (nom):
                nom = nom + esp + elem
            else:
                nom = elem

            nb_nom+=1

    new_line = list()
    #new_line.append(int(line[0]))
    new_line.append(nom)
    line_autocomplete.append(nom)
    
    key = line[1+nb_nom].replace('nÂ°','')

    if ( key.isdigit() ):
        new_line.append(int(key))
        line_autocomplete.append(int(key))
    
    l=2
    while ( (l+nb_nom) != (len(line)-2) ):
        somme = 0
        try:
            if ( re.match(exp_time,line[l+nb_nom]) ):
                somme = int(line[l+nb_nom][0:2])*3600 + int(line[l+nb_nom][3:5])*60 + int(line[l+nb_nom][6:8])
            if ( somme != 0):
                new_line.append(somme)
            elif ( line[l+nb_nom] == '*'):
                pass
            else:
                new_line.append(line[l+nb_nom])
        except:
            break
        l+=1

    tab_general.append(new_line)
    recur = 0
    if( tab_autocomplete ):
        for m in range(0,len(tab_autocomplete)):
            if ( tab_autocomplete[m][0] == line_autocomplete[0]):
                recur = 1
                break
    if ( recur == 0 ):
        tab_autocomplete.append(line_autocomplete)

temp44 = str(tab_general)
temp55 = temp44.replace(', [',',\n[')

file_tab_general = open("D:/Projects/Chouette/javascripts/tab-general-2019.js","w")
file_tab_general.write("let tab_general_2019 = " + temp55 + ";")
file_tab_general.close()

temp77 = str(tab_autocomplete)
temp88 = temp77.replace(', [',',\n[')

file_tab_autocomplete = open("D:/Projects/Chouette/javascripts/tab-autocomplete-2019.js","w")
file_tab_autocomplete.write("let tab_autocomplete_2019 = " + temp88 + ";")
file_tab_autocomplete.close()