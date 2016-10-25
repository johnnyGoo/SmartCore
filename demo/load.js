var Utils=Smart.Utils;
Utils.getScript('http://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.1.0.min.js',function () {
    $('#example').append('jquery is loaded <br/>');
    Utils.getCss('load.css',function () {
        $('#example').append('load.css is loaded')
    })

})
