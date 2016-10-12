$(document).ready(function () {
	$(".button-collapse").sideNav({
		menuWidth: 300,
		edge: 'right',
	});
	$('.collapsible').collapsible();
	$('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      starting_top: '4%', // Starting top style attribute
      ending_top: '10%', // Ending top style attribute
    }
  );
	$('ul.tabs').tabs();
	$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: true, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 20, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
  );
})

/*
CODE WRITTEN BY DITI

$('.classforstocks').click(function () {
   $.ajax({
  url:'/stocks/list',
  type:POST,
  data://here, you have to write names of variables with the param thing, i couldn't find it, so i left it,
  dataType='json',
  success:function(data){
      //saksham, bhargav told me you need to write some loop here to check data
   })
  }
  });

  $('.classforinvestors').click(function () {
   $.ajax({
  url:'/mf/list',
  type:POST,
  data://here, you have to write names of variables with the param thing, i couldn't find it, so i left it,
  dataType='json',
  success:function(data){
            //saksham, bhargav told me you need to write some loop here to check data
   })
  }
  });

  $('.classfortransactions').click(function () {
   $.ajax({
  url://i can't find the url in routes for any function that tells what stocks a person owns,
  type:POST,
  data://here, you have to write names of variables with the param thing, i couldn't find it, so i left it,
  dataType='json',
  success:function(data){
            //saksham, bhargav told me you need to write some loop here to check data
   })
  }
  });

$('.listoflb').click(function () {
   $.ajax({
  url:'/statistics/leaderboard',
  type:POST,
  data://dude I can't find the code fpr lb and all, coz there is no controller called STATSCONTROLLER and even leaderboard is spelled wrong there, so you'll need to check,
  dataType='json',
  success:function(data){
            //saksham, bhargav told me you need to write some loop here to check data
   })
  }
  });

  $('.listofrel').click(function () {
   $.ajax({
  url:'/statistics/relative',
  type:POST,
  data://dude I can't find the code fpr lb and all, coz there is no controller called STATSCONTROLLER and even leaderboard is spelled wrong there, so you'll need to check,
  dataType='json',
  success:function(data){
            //saksham, bhargav told me you need to write some loop here to check data
   })
  }
  });

  $('.listoftopstocks').click(function () {
   $.ajax({
  url://i can't find the url in routes for any function that tells top stocks,
  type:POST,
  data://dude I can't find the code fpr lb and all, coz there is no controller called STATSCONTROLLER and even leaderboard is spelled wrong there, so you'll need to check,
  dataType='json',
  success:function(data){
            //saksham, bhargav told me you need to write some loop here to check data
   })
  }
  });

  $('.listoftopinv').click(function () {
   $.ajax({
  url://i can't find the url in routes for any function that tells top investors,
  type:POST,
  data://dude I can't find the code fpr lb and all, coz there is no controller called STATSCONTROLLER and even leaderboard is spelled wrong there, so you'll need to check,
  dataType='json',
  success:function(data){
            //saksham, bhargav told me you need to write some loop here to check data
   })
  }
  });

  




  */
