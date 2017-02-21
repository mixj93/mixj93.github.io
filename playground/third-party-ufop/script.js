var name = '';
var title = '';
var provider = '';
var providerFullName = '';
var date = '';
var year = '';
var month = '';

getLocalStore();
setInputVal();

$("#btnGen").click(function(){
  console.log('generating...')
  var name = $('#inputName').val() || 'ufop_name';
  var title = $('#inputTitle').val() || 'UFOP 标题';
  var provider = $('#inputProvider').val() || '供应商';
  var providerFullName = $('#inputProviderFullName').val() || '供应商全称';
  var now = new Date();
  var defalutYear = now.getFullYear();
  var defalutMonth = now.getMonth() +1;
  var defalutDate = now.getDate();
  var date = $('#inputDate').val() || `${defalutYear}-${defalutMonth}-${defalutDate}`;
  var year = date.split('-')[0];
  var month = date.split('-')[1];
  
  setLocalStore();

  var insertText = `db.ufop.insert({"created_at":ISODate("${date}T00:00:00.366Z"), "logo":"service-logo-${name}.png", "name":"${name}", "priority" : 0, "provider":"", "provider_full_name":"", "status":false, "title":"", "version":"${year}.${month}.0001"})`;
  var updateTitleText = `db.ufop.update({'name':'${name}'},{$set:{'title':'${title}'}})`;
  var updateProviderText = `db.ufop.update({'name':'${name}'},{$set:{'provider':'${provider}'}})`;
  var updateProviderFullNameText = `db.ufop.update({'name':'${name}'},{$set:{'provider_full_name':'${providerFullName}'}})`;
  var updateStatus = `db.ufop.update({'name':'${name}'},{$set:{'status':true}})`;

  $('#textareaInsert').text(insertText);
  $('#textareaTitle').text(updateTitleText);
  $('#textareaProvider').text(updateProviderText);
  $('#textareaProviderFullName').text(updateProviderFullNameText);
  $('#textareaStatus').text(updateStatus);
});

function setLocalStore() {
  localStorage.setItem('name', name);
  localStorage.setItem('title', title);
  localStorage.setItem('provider', provider);
  localStorage.setItem('providerFullName', providerFullName);
  localStorage.setItem('date', date);
  localStorage.setItem('year', year);
  localStorage.setItem('month', month);
}

function getLocalStore() {
  name = localStorage.getItem('name');
  title = localStorage.getItem('title');
  provider = localStorage.getItem('provider');
  providerFullName = localStorage.getItem('providerFullName');
  date = localStorage.getItem('date');
  year = localStorage.getItem('year');
  month = localStorage.getItem('month');
}

function setInputVal() {
  $('#inputName').val(name);
  $('#inputTitle').val(title);
  $('#inputProvider').val(provider);
  $('#inputProviderFullName').val(providerFullName);
  $('#inputDate').val(date);
}