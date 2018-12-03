class Calendar{
  constructor() {
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    this.date = new Date()
    this.year = this.date.getFullYear()
    this.month = this.date.getMonth()
    this.build_calendar();

  }


  build_calendar(){
    var header = this.months[this.month] + " " + this.year;
    document.getElementById("header__text").innerHTML = header;

    var blank_cells_before = this.get_blank_lines_before()

    var days_in_month = new Date(this.year, this.month + 1, 0).getDate();

    var blank_cells_after = 42 - blank_cells_before - days_in_month

    var calendar_body_html = ""

    for(var i = 0; i < blank_cells_before; i++){
      calendar_body_html += '<div class="calendar__cell"></div>'
    }

    for(var j = 1; j <= days_in_month; j++){
      calendar_body_html += '<div class="calendar__cell" onclick="calendar.make_todo_list(' + j + ')">' + j + '</div>'
    }

    for(var k = 0; k < blank_cells_after; k++){
      calendar_body_html += '<div class="calendar__cell"></div>'
    }

    // document.getElementById("calendar").innerHTML = blank_cells_before + " " + days_in_month + " " + blank_cells_after;
    document.getElementById("calendar").innerHTML = calendar_body_html
  }

  get_blank_lines_before(){
    var first_day = new Date(this.year + "-" + (this.month + 1) + "-01").getDay()
    var blank_cells_before = first_day - 1

    if (first_day <= 1){
      blank_cells_before = first_day + 6
    }

    return blank_cells_before
  }

  next_month(){
    this.month += 1
    if(this.month === 12){
      this.month = 0
      this.year += 1
    }
    this.build_calendar()
  }

  prev_month(){
    this.month -= 1
    if(this.month === -1){
      this.month = 11
      this.year -= 1
    }
    this.build_calendar()
  }

  make_todo_list(day){
    var todo = new TODOList()

    var date = this.year + '-' + (this.month + 1) + '-' + day
    var resp = todo.get("http://localhost:3000/todo_lists/" + date)
    alert(resp)
    if (resp === '{}'){

      var send_post = todo.post("http://localhost:3000/todo_lists", JSON.stringify({"id": date, "name": "anton548"}))
      alert(send_post)
    }

  }

}


class TODOList{
  constructor(){
  }

  get(url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
  }

  post(url, req){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", url, false ); // false for synchronous request
    xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xmlHttp.send(req);
    return xmlHttp.responseText;
  }

}


var calendar = new Calendar()