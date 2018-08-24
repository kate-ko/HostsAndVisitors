var source = $('#hosts-template').html()
var templateH = Handlebars.compile(source)

var sourceV = $('#visitors-template').html()
var templateV = Handlebars.compile(sourceV)

var visitors = []
var hosts = []

getHosts()
getVisitors()

$("#visit-button").on("click", function () {
    let serverName = $("#host-name").val()
    visitHost(serverName)
});

function visitHost(serverName) {
    $.ajax({
        method: "GET",
        url: "https://" + serverName + ".serveo.net/message/kate",
        dataType: "json",
        success: function (data) {
            saveHostToServer(data)
            let newHost = { name: data.name, text: data.text }
            hosts.push(newHost)
            renderHosts()
            getVisitors()
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus)
        }
    })
}


function saveHostToServer(newHost) {
    $.ajax({
        method: "POST",
        url: 'write-to-hosts',
        data: newHost,
        dataType: "json",
        success: function (data) {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}

function getHosts() {
    $.ajax({
        method: "GET",
        url: 'hosts',
        dataType: "json",
        success: function (data) {
            hosts = JSON.parse(data)
            renderHosts()
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}

function getVisitors() {
    $.ajax({
        method: "GET",
        url: 'visitors',
        dataType: "json",
        success: function (data) {
            visitors = JSON.parse(data)
            renderVisitors()
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}

function renderHosts() {
    let newHTML = templateH(hosts)
    $('.hosts').html(newHTML)
}

function renderVisitors() {
    let newHTML = templateV(visitors)
    $('.visitors').html(newHTML)
}

