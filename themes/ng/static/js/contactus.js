
    document.getElementById("post_contact_us").onclick = function() {
        var title = document.getElementById("contact_title").value;
        var name = document.getElementById("contact_name").value;
        var email = document.getElementById("contact_email").value;
        var body = document.getElementById("contact_message").value;
        if (title != undefined && body != undefined) {
            window.open("https://github.com/ngchain/contactus/issues/new?title=" + title + "&body=From: " + name + " [" + email +  "]%0a%0a" + + body);
        }
    }

