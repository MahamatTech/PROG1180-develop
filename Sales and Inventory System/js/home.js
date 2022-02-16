window.addEventListener("load",function(){
  $("#show-announcement").click(function(){
    let btnAnnouncementVal = $("#show-announcement").html();
    if(btnAnnouncementVal.includes("More")) {
      $("#show-announcement").html("Show Less");
    }
    else {
      $("#show-announcement").html("Show More");
    }
  });
});