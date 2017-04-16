$(function(){

  // Logout
  $('.logo').click(function(){
    $(location).attr('href', '../index.html');
  });

  // Link active
  $('.link').click(function(e){
    e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
  });

  // Login Form Click Handler
  $('#signin').click(function(){
    saveUser();
    heroExit();
  });

  // update navatar
  createNavatar();

  // Dashboard Cards Animate In
  cardsAnimateIn();

  // vote
  vote();

  // show detail
  showDetail();

  // Hide Detail
  hideDetail();

}); // END OF MAIN








// --------------------------------
//            Custom f()s
// --------------------------------
function saveUser(){
  // Get firstName input
  var first = $('#first').val()
  console.log(first);
  // Get lastName input
  var last = $('#last').val();
  console.log(last);
  // Get password input
  var pwsd = $('#pswd').val();
  console.log(pswd);
  // update user Obj. with new input
  userInfo = {
      firstName: first,
      lastName: last,
      password: pwsd
  };
  console.log(userInfo);
  // push obj. to localForage
  localStorage.setItem('user', JSON.stringify(userInfo));
}

// ------------------------
//         heroExit()
// ------------------------
function heroExit(){
  // Left Col animation
  $('.left').addClass('animated fadeOutLeft');
  // Right Col animation
  $('.right').addClass('animated fadeOutRight');
  // Background animation
  setTimeout(function(){
    $('.wrapper').addClass('animated fadeOutDown');
  }, 650);
  // Redirect To dashboard
  setTimeout(function(){
    $(location).attr('href', '../partials/dashboard.html');
  }, 1400);
}

// ------------------------
//     cardsAnimateIn()
// ------------------------
function cardsAnimateIn(){
  $('.card').each(function(i){
    setTimeout(function(){
      $('.card').eq(i).addClass('is-visible animated fadeInRight');
    }, 300 * i);
  });
}

// ------------------------
//           vote()
// ------------------------
function vote(){
  // Check if there is a previous vote
  var vote = JSON.parse(localStorage.getItem('vote'));
  if(vote.total == 0 ){
    $('.poll-btn.one').click(function(e){
      $('.polls-btn').hide();
      $('.info-message').css({'display':'block'});
      $('.first').addClass('did-vote');
      $('#p1').html('60%');
      confirmVote(e);
      $(this).addClass('is-disabled');
    });
    $('.poll-btn.two').click(function(e){
      $('.polls-btn').hide();
      $('.info-message').css({'display':'block'});
      $('.second').addClass('did-vote-2');
      $('#p2').html('84%');
      confirmVote(e);
      $(this).addClass('is-disabled');
    });
  }
  // Disabled if previously voted
  $('.polls-btn').hide();
  $('.info-message').css({'display':'block'});
  $(this).addClass('is-disabled');
}

// ------------------------
//       confirmVote()
// ------------------------
function confirmVote(e){
  // Define empty vote obj.
  var voteCounts = {
    great: 0,
    greatest: 0,
    total: 0
  };
  // Parse obj. click event
  var vote = e.target.innerText;
  // Storage Logic
  if(vote === 'Great'){
    // update vote obj
    voteCounts.great = 1;
    voteCounts.total = voteCounts.total + 1;
    // push updated obj to storage
    localStorage.setItem('vote', JSON.stringify(voteCounts));
  }else{
    // update obj
    voteCounts.greatest = 1;
    voteCounts.total = voteCounts.total + 1;
    // push updated obj to storage
    localStorage.setItem('vote', JSON.stringify(voteCounts));
  }
  console.log('Vote added to storage...');
}


// ------------------------
//       showDetail()
// ------------------------
function showDetail(){
  // Get btn
  $('.card-link').click(function(e){
  // Clear out lightbox
  $('#details').empty();
  // check what section the btn is in
  var section = e.target.parentElement.id;
  // Show Corresponding section
  if(section == 'about'){
    updateLb(about);
  }
  else if(section == 'quotes'){
    updateLb(quotes);
  }
  else if(section == 'debugging'){
    updateLb(debugging);
  }
  else if(section == 'awards'){
    updateLb(awards);
  }
  console.log('details shown');

  // Show that sections details only
  $('.lightbox').addClass('lb-visible');
  // Change the text of lightbox innercontent
  $('#lb-title').text(section.title);

  });
}

// ------------------------
//     updateLightbox()
// ------------------------
function updateLb(obj){
  // update lightbox title
  $('#lb-title').text(obj.title);
  // Check if object is arrary or text
  if(typeof(obj.content) != 'object'){
    console.log('Not an array');
    var $li = '<li></li>';
    $li  = $($li).text(obj.content);
    $('#details').html($li);
  }
  else{
    console.log('Content is an array');
    for(i in obj.content){
      var $li = '<li class="bullets"></li>';
      $li = $($li).text(obj.content[i]);
      $('#details').append($li);
    }
  }
  console.log('Lightbox updated...');
}

// ------------------------
//       hideDetail()
// ------------------------
function hideDetail(){
  $('.lightbox-body i').click(function(){
      $('lightbox').removeClass('lb-visible');
  });
  $('.lightbox').click(function(){
      $('.lightbox').removeClass('lb-visible');
  });
  console.log('Details hidden');
}

// ------------------------
//       getInitials()
// ------------------------
function createNavatar(){
  // Get user obj.
  var user = JSON.parse(localStorage.getItem('user'));
  // Get firstname char at 0 from localForage
  var fInitial = user.firstName.charAt(0);
  // Get lastname char at 0 from localForage
  var lInitial = user.lastName.charAt(0);
  var initials = fInitial + lInitial;
  // Check obj was parsed
  console.log(initials);


  // Update inner text of avatar to two initials
  $('.navatar').text(initials);
  $('#user').text(user.firstName);
}

// --------------------------------
//    GRACE HOPPER DATA OBJECTS.
// --------------------------------
var about = {
  title: 'About',
  date: 'December 9, 1906 – January 1, 1992',
  content: 'Grace Hopper was an American computer scientist and United States Navy rear admiral. She was one of the first programmers of the Harvard Mark I computer in 1944, and invented the first compiler for a computer programming language, and the one of those who popularized the idea of machine-independent programming languages, which led to the development of COBOL, one of the first high-level programming languages. She is credited with popularizing the term \"debugging\" for fixing computer glitches (inspired by an actual moth removed from the computer). Owing to the breadth of her accomplishments and her naval rank, she is sometimes referred to as \"Amazing Grace\". The U.S. Navy Arleigh Burke class guided-missile destroyer USS Hopper (DDG-70) is named for her, as was the Cray XE6 \"Hopper\" supercomputer at NERSC.'
};

var debugging = {
  title: 'Debugging',
  content: 'Hopper was known for popularizing the term \"bug\" in software development. While she was working on a Mark II Computer at a US Navy research lab in Dahlgren, Virginia in 1947, her associates discovered a moth stuck in a relay and thereby impeding operation, whereupon she remarked that they were \"debugging\" the system. Though the term bug had been in use for many years in engineering to refer to small glitches and inexplicable problems, Admiral Hopper did bring the term into popularity. The remains of the moth can be found in the group\'s log book at the Smithsonian Institution\'s National Museum of American History in Washington, D.C.'
};

var quotes = {
  title: 'Quotes',
  content: ['The most important thing I\'ve accomplished, other than building the compiler, is training young people. They come to me, you know, and say, \'Do you think we can do this?\' I say, \"Try it." And I back \'em up. They need that. I keep track of them as they get older and I stir \'em up at intervals so they don\'t forget to take chances.',
          'It\'s easier to ask forgiveness than it is to get permission.',
          'You manage things; you lead people.'
          ]
};

var awards = {
  title: 'Awards',
  content: ['1969: Hopper was awarded the inaugural Computer Sciences Man of the Year award from the Data Processing Management Association.',
          '1971: The annual Grace Murray Hopper Award for Outstanding Young Computer Professionals was established in 1971 by the Association for Computing Machinery.',
          '1973: First American and the first woman of any nationality to be made a Distinguished Fellow of the British Computer Society.',
          '1982: American Association of University Women Achievement Award and an Honorary Doctor of Science from Marquette University.',
          '1985: Honorary Doctor of Letters from Western New England College (now Western New England University).',
          '1986: Upon her retirement, she received the Defense Distinguished Service Medal.',
          '1987: The first Computer History Museum Fellow Award Recipient "for contributions to the development of programming languages, for standardization efforts, and for lifelong naval service."',
          '1988: Golden Gavel Award at the Toastmasters International convention in Washington, DC.',
          '1991: National Medal of Technology.',
          '1991: Elected a Fellow of the American Academy of Arts and Sciences.',
          '1996: USS Hopper (DDG-70) was launched. Nicknamed Amazing Grace, it is on a very short list of U.S. military vessels named after women.',
          '2001: Eavan Boland wrote a poem dedicated to Grace Hopper titled "Code" in her 2001 release Against Love Poetry.',
          '2001: The Gracies, the Government Technology Leadership Award were named in her honor.',
          '2009: The Department of Energy\'s National Energy Research Scientific Computing Center named its flagship system "Hopper".',
          '2009: Office of Naval Intelligence creates the Grace Hopper Information Services Center.',
          ]
};