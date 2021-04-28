module.exports = ({ name, courses }) => {
	const today = new Date();
	const course = courses.map((course) => course.name);
	return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
          p {
              display : flex;
              flex-direction : row;
              height : 40px;
              width : 100%;
              color : blue;
              margin-right : 20px;


          }

          h2{
              color : black;
          }

          h2 span{
              color : red;
          }
            
             
        
          </style>
       </head>
       <body>
       <h3>${today}</h3>
      <h2>Name - <span>${name}<span/></h2>
      <h3>Courses Registered -<h3/><p> ${course} <p/>
             
              
       </body>
    </html>
    `;
};
