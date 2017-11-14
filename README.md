## Annotator Tool One: Reference String Extraction
### General
The goal of Annotator Tool One is **"Reference String Extraction"**. 
It means that the **assessora** are able to select reference strings, one by one, and 
compare it with the related article (Which is displayed as a pdf file on the same page) 
then can add these tags (```<ref>``` and ```</ref>```) to the start and end of each reference.

### How To Use
1. first put a copy of **"Annotatortool1"** folder in the localhost directory. 
2. then use this URL ```http://localhost:8080/Annotatortool1/index.html``` to run the tool.

### Sample File To Use
You can find some sample files to test the annotator tool one [here](https://github.com/exciteproject/Annotator_tool/blob/master/TestFiles/anno1).
These samples consists of layout file which extracted from a sample pdf by [Refex] (https://github.com/exciteproject/refext).

### Output Sample
Output File will be in XML Format. The following is part of sample output from Annotator Tool One:
```html
.
..
...
<ref>1971: Theorie der Subkultur. Frankfurt a.M.</ref>
<ref>1976: Rosa Luxemburg im botanischen Garten, gesungen im Kulturzelt aufdem Pfingst­
kongress, Booklet zur Kassette „Pfingstkongreß 1976“, Sozialistisches Bürol985</ref>
<ref>1978/1982: Zur Geschichte der Zukunft. Zukunftsforschung und Sozialismus, Band 1.
Frankfurt a.M.</ref>
...
..
.
```

## Annotator Tool Two: Meta-data Extraction
### General
The goal of Annotator Tool Two is **"Meta-data Extraction"**.
This annotator gives assessors this possibility to tag metadata in each reference string.
Which could include these Meta datas: ```<author>, <year>, <article-title>, <volume>, <source> ... ``` .

### How To Use
There are two ways of using Annotator Tool Two:

1- Using [CERMINE](https://github.com/CeON/CERMINE) to extracting Meta datas automaticly. in this case **"Apache Tomcat"** is needed.
* first drop a copy of **"webservice.war"** file in the deploy directory in Tomcat.
* next put a copy of **"Annotatortool2"** folder in the deploy directory in Tomcat.
* then use this URL ```http://localhost:8080/Annotatortool2/index.html``` to run the tool.

2- Extracting Meta datas without using CERMINE:
* put a copy of **"Annotatortool2"** in localhost directory. 
* use this URL ```http://localhost:8080/Annotatortool2/index.html``` to run the tool.

### Sample File To Use
You can find some sample files to test the annotator tool two [here] [here](https://github.com/exciteproject/Annotator_tool/blob/master/TestFiles/anno2)
These samples consists of refrence strings which extracted from a sample pdf by [CERMINE](https://github.com/CeON/CERMINE)

### Output Sample
Output File will be in XML Format. The following is part of output for a segmented reference string:

```html
...
<author><surname>er</surname>, W./Gürtler, <given-names>M.</given-names></author> (<year>2006</year>)
<article-title>: “Performance Evaluation, Portfolio Selection, and HARA Utility”</article-title>, 
<source>European Journal of Finance</source>, Vol. <volume>18</volume>, pp. 
<fpage>649</fpage>-<lpage>669</lpage>. - Breuer, W./Gürtler, M./Schuhmacher,
...
```
