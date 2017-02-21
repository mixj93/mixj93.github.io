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
  var date = $('#inputDate').val() || `${defalutYear}-${defalutMonth}-${defalutDate}`
  var year = date.split('-')[0]
  var month = date.split('-')[1]
  
  var insertText = `db.ufop.insert({"created_at":ISODate("${date}T00:00:00.366Z"), "logo":"service-logo-${name}.png", "name":"${name}", "priority" : 0, "provider":"", "provider_full_name":"", "status":false, "title":"", "version":"${year}.${month}.0001"})`;
  var updateTitleText = `db.ufop.update({'name':'smtextspam'},{$set:{'title':'${title}'}})`;
  var updateProviderText = `db.ufop.update({'name':'smtextspam'},{$set:{'provider':'${provider}'}})`;
  var updateProviderFullNameText = `db.ufop.update({'name':'smtextspam'},{$set:{'provider':'${providerFullName}'}})`;

  $('#textareaInsert').text(insertText);
  $('#textareaTitle').text(updateTitleText);
  $('#textareaProvider').text(updateProviderText);
  $('#textareaProviderFullName').text(updateProviderFullNameText);
});