function updateTimeago(){
  for(const elem of document.getElementsByClassName('timeago')){
    document.getElementById(elem.id).innerHTML=dayjs().from(dayjs.unix(dates[elem.id]),true);
  }
}
function init(){
  dayjs.extend(window.dayjs_plugin_relativeTime); 
}
window.addEventListener('load', init);
window.addEventListener('load', updateTimeago);

dates = {};

function updateItem(itemid, action){
    fetch('/item/'+action, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: itemid
          })
    }).then(
        $('#'+itemid+'-cont').hide(100, function(){$('#'+itemid+'-cont').remove()})
    );
}

function approve(itemid){
    updateItem(itemid, 'approve');
}

function reject(itemid){
    updateItem(itemid, 'reject');
}