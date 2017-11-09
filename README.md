## Annotator Tool One: Reference String Extraction
### General
The goal of **"Annotator Tool One"** is Reference String Extraction. It means that Assessor can select reference strings one by one compare it with pdf file and  add <ref> and </ref> tags to start and the end of each references.

### Usage

### Output Sample
The output will be like this:
```javascript
<ref>1971: Theorie der Subkultur. Frankfurt a.M.</ref>
<ref>1976: Rosa Luxemburg im botanischen Garten, gesungen im Kulturzelt aufdem Pfingst­
kongress, Booklet zur Kassette „Pfingstkongreß 1976“, Sozialistisches Bürol985</ref>
<ref>1978/1982: Zur Geschichte der Zukunft. Zukunftsforschung und Sozialismus, Band 1.
Frankfurt a.M.</ref>
```
### Sample File To Use
There is a sample file for test the annotator tool one : [here](https://github.com/exciteproject/Annotator_tool/blob/master/TestFiles/anno1/47351.txt)

## Annotator Tool Two: Meta-data Extraction
### General
The goal of **"Annotator Tool Two"** is Meta-data Extraction

This is a **"Meta-data Extraction"**

This annotator gives our assessors the possibility to tag some metadata in each reference string in a paper

Meta datas like: author, year, title, container, editorial board and others , ...

### Usage

### Output Sample
The output will be like this:

```javascript
<author><surname>er</surname>, W./Gürtler, <given-names>M.</given-names></author> (<year>2006</year>)
<article-title>: “Performance Evaluation, Portfolio Selection, and HARA Utility”</article-title>, 
<source>European Journal of Finance</source>, Vol. <volume>18</volume>, pp. 
<fpage>649</fpage>-<lpage>669</lpage>. - Breuer, W./Gürtler, M./Schuhmacher,
```
### Sample File To Use
There is a sample file for test the annotator tool Tow : [here](https://github.com/exciteproject/Annotator_tool/blob/master/TestFiles/anno2/17094-6710.txt)