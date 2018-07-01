$('document').ready(()=>{
  $('#createform').submit((event)=>{
    event.preventDefault()
    pitch=$('#Pitch').val().trim()
    category=$('#catchoose').val().trim()
    if (pitch.length < 2){return}
    $.ajax(
      {
        url:'/newpitch',
        data:{
          'pitch':pitch,
          'category':category
        },
        method:'GET',
        success:(data)=>{
          $("#pitches").prepend(data)
          $('#createform')[0].reset()
        },
        error: (data)=>{
          alert('Could not post pitch')
        }
      }
    )
  })
  submitcomment=(postid)=>{
    $.post('/newcomment/'+postid, $('form#comment'+postid).serialize(),(data)=>{
      $(data).hide().appendTo($('#comments'+postid)).show('fast');
      count=$('#commentscount'+postid)
      count.text(parseInt(count.text())+1)
    });
    [...$(".commentinput")].forEach(c=>c.value='')
  }
  like=(pitch)=>{
    $.ajax(
      {
        url:'/like/'+pitch,
        method:'GET',
        success:(data)=>{
          if (data=='Success'){
            l=$('#like'+pitch)[0].textContent
            likes=parseInt(l)
            likes++
            $('#like'+pitch)[0].textContent=' '+likes.toString()+' '
          }
        }
      }
    )
  }
  dislike=(pitch)=>{
    $.ajax({
      url:'/dislike/'+pitch,
      method:'GET',
      success:(data)=>{
        if (data=='Success'){
          l=$('#dislike'+pitch)[0].textContent
          dislikes=parseInt(l)
          dislikes++
          $('#dislike'+pitch)[0].textContent=' '+dislikes.toString()+' '
        }
      }
    })
  }
  removecomment=(comment)=>{
    $('#comment'+comment).hide(300,()=>{$('#comment'+comment).remove()});
    count=$("#commentcount")
    count.text(parseInt(count.text())-1)
    $.post('/delete/comment/'+comment);
  }
  removepost=(post)=>{
    $('#post'+post).hide(300,()=>{$('#post'+post).remove()});
    count=$("#postcount")
    count.text(parseInt(count.text())-1)
    $.post('/delete/post/'+post);
  }
  fav=(post,elem)=>{
    $.get('/fav/'+post);
    elem=$(elem)
    elem.toggleClass('glyphicon-heart')
    elem.toggleClass('glyphicon-ok')
    if(window.location.pathname=='/my-favorites/'){
      elem.parent().hide(150)
    }
  }
  recordchange=(ind,ls)=>{
    if (ind==ls){
      $("#manual").show('normal')
      $("#manual").attr('required','')
    }else{
      $("#manual").hide('normal')
      $("#manual").removeAttr('required')
    }
  }
  filterelements=c=>{
    $(".post").each((n,elem)=>{elem=$(elem);if(!elem.hasClass(c)){elem.hide('fast')}else{elem.show(50)}})
  }
})
