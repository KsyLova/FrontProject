  function changeLanguage(){
      const btn = document.getElementById('changeLang')
      if (btn.innerText==="English version"){
          document.getElementById('org').innerText='GU OF THE MIA OF RUSSIA IN MOSCOW'
          document.getElementById('surname').innerText='Krylova'
          document.getElementById('name').innerText='Kseniya'
          document.getElementById('patronymic').innerText='Dmitrievna'
          document.getElementById('gender').innerText='Fem.'
          btn.innerText='Russian version'
      }
      else{
          document.getElementById('org').innerText='ГУ МВД РОССИИ ПО Г. МОСКВЕ'
          document.getElementById('surname').innerText='Крылова'
          document.getElementById('name').innerText='Ксения'
          document.getElementById('patronymic').innerText='Дмитриевна'
          document.getElementById('gender').innerText='Жен.'
          btn.innerText='English version'
          
      }
  }
             