## Annotator tools Introduction
### EXRef-Identifier: Reference String Identifier
#### General
The goal of this Annotator Tool is **"Reference String Identifying"**. 

#### How To Run
1. first put a copy of **"EXRef-Identifier"** folder in the localhost directory. 
2. then use this URL ```http://localhost/EXRef-Identifier/index.html``` to run the tool.
#### How To Use
1. First you should upload two file. One is a paper in pdf format and second one is layout file in .txt fromat.
2. Next, you should find the reference section in each file
3. Then select reference strings in text file, compare it with the original text in pdf and add ```<ref>``` and ```</ref>``` tags to the beginning and the end of each reference by click on related button.
4. Finlay save it as a XML file.
#### Sample File To Use
There are some sample files to test **EXRef-Identifier** [here](https://github.com/exciteproject/EXannotator/tree/master/TestFiles/anno1).
These samples consists of layout file which extracted from a sample pdf by [Refex](https://github.com/exciteproject/refext).
#### Output Sample
Output File will be in XML Format. The following is part of sample output from **EXRef-Identifier**:
```html
.
..
<ref>1971: Theorie der Subkultur. Frankfurt a.M.</ref>
<ref>1976: Rosa Luxemburg im botanischen Garten, gesungen im Kulturzelt aufdem Pfingst­
kongress, Booklet zur Kassette „Pfingstkongreß 1976“, Sozialistisches Bürol985</ref>
<ref>1978/1982: Zur Geschichte der Zukunft. Zukunftsforschung und Sozialismus, Band 1.
Frankfurt a.M.</ref>
..
.
```

### EXRef-Segmentation: Meta Data Segmentation
#### General
The goal of EXRef-Segmentation is **"Meta Data Segmentation"**.
This annotator gives assessors this possibility to tag meta data in each reference string.
Which could be include these Meta datas: ```<author>, <surname>, <given-names>, <title>, <editor>, <publisher>, <year>, <volume>, <issue>, <identifier>,
             <source>, <url>, <fpage>, <lpage>, <other>,  ... ``` .

#### How To Run
There are two ways of using EXRef-Segmentation:

1- Using [CERMINE](https://github.com/CeON/CERMINE) to extracting Meta datas automaticly. in this case **"Apache Tomcat"** is needed.
* first drop a copy of **"webservice.war"** file in the deploy directory in Tomcat.
* next put a copy of **"Annotatortool2"** folder in the deploy directory in Tomcat.
* then use this URL ```http://localhost:8080/Annotatortool2/index.html``` to run the tool.

2- Extracting Meta datas without using CERMINE:
* put a copy of **"Annotatortool2"** folder in localhost directory. 
* use this URL ```http://localhost:8080/Annotatortool2/index.html``` to run the tool.

#### How To Use
1. First upload a text file which contain references (each reference should be in one line).
2. Second select meta data in text and tagged them by click on related buttons.
3. then navigate between references.
4. Finlay save it as a XML file.
#### Sample File To Use
There are some sample files to test EXRef-Segmentation [here](https://github.com/exciteproject/Annotator_tool/blob/master/TestFiles/anno2)
These samples consists of reference strings which extracted from a sample pdf by [CERMINE](https://github.com/CeON/CERMINE)

#### Output Sample
Output File will be in XML Format. The following is part of output for a segmented reference string by **EXRef-Segmentation**:

```html
...
<author><surname>er</surname>, W./Gürtler, <given-names>M.</given-names></author> (<year>2006</year>)
<article-title>: “Performance Evaluation, Portfolio Selection, and HARA Utility”</article-title>, 
<source>European Journal of Finance</source>, Vol. <volume>18</volume>, pp. 
<fpage>649</fpage>-<lpage>669</lpage>. - Breuer, W./Gürtler, M./Schuhmacher,
...
```
