***

<h1 align="center"> 
  <sub>
    <img src="src/favicon.ico" height="40" width="40">
  </sub>
  ChmuSK
</h1>

***

ChmuSK is a cloud storage service for consumers. ChmuSK allows its users to privately store files, such as pictures, videos and documents, and access them from any computer connected to the Internet.

You can try it at: http://ptakf-uek.github.io/ChmuSK

Project developed by Maciej Jastrzębski, Filip Ptak and Krystian Taf.

***

## How to run

#### Software requirements
- Node.js

#### How to build
```
git clone https://github.com/ptakf-uek/ChmuSK
cd ChmuSK
npm install (--omit=dev to skip installing development dependencies)
ng build chmusk
```
The compiled application can then be found in the 'dist/chmusk' output directory.

Alternatively, you can build the application with
```
ng serve
```
which will serve the app at localhost:4200 and rebuild it on file changes.
