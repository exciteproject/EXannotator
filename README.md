## Annotator Tool One: Reference String Extraction
### General
The goal of Annotator Tool One is **"Reference String Extraction"**. 
It means that, Assessors can select reference strings one by one and 
compare it with the article pdf file (which is available in the same page) 
then add ```<ref>``` and ```</ref>``` tags to the start and end of each reference.

### How To Use
1. put a copy of "Annotatortool1" folder in localhost folder. 
2. use this URL ```http://localhost:8080/Annotatortool1/index.html``` to run the tool.

### Output Sample
Output File Format will be in XML. This is a part of references section in output file:
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
### Sample File To Use
Here you can find a sample file to test the annotator tool one : [here](https://github.com/exciteproject/Annotator_tool/blob/master/TestFiles/anno1)

## Annotator Tool Two: Meta-data Extraction
### General
The goal of Annotator Tool Two is **"Meta-data Extraction"**.
This annotator gives assessors this possibility to tag some metadata in each reference string.
Meta datas like: ```<author>, <year>, <article-title>, <container>, <source> and others ```.

### How To Use
There are two ways of using Annotator Tool Two.

1- Extracting Meta datas automaticly by Using [CERMINE](https://github.com/CeON/CERMINE):
* Apache Tomcat is needed
* drop "webservice.war" in the deploy directory in Tomcat.
* put a copy of "Annotatortool1" folder in in the deploy directory in Tomcat.
* use the URI ```http://localhost:8080/Annotatortool2/index.html``` and run the tool.

2- Extracting Meta datas without CERMINE:
* put a copy of "Annotatortool1" in localhost folder. 
* use the URI ```http://localhost:8080/Annotatortool2/index.html``` and run the tool.

### Output Sample
Output File Format will be in XML and this is a part of output for a segmented reference string:

```html
...
<author><surname>er</surname>, W./Gürtler, <given-names>M.</given-names></author> (<year>2006</year>)
<article-title>: “Performance Evaluation, Portfolio Selection, and HARA Utility”</article-title>, 
<source>European Journal of Finance</source>, Vol. <volume>18</volume>, pp. 
<fpage>649</fpage>-<lpage>669</lpage>. - Breuer, W./Gürtler, M./Schuhmacher,
...
```
### Sample File To Use
Here you can find some sample files to test the annotator tool Tow : [here](https://github.com/exciteproject/Annotator_tool/blob/master/TestFiles/anno2)