var TwitterClient = function (credentials) {

    this.credentials = credentials;

    this.get = function(resource, params, success, failure) {
        return this._request("GET", resource, {});
    };

    this.post = function(resource, params, success, failure) {
        return this._request("POST", resource, params);
    };

    this._request = function(method, resource, params, success, failure) {
        var url = "https://api.twitter.com/1.1";
        url = url + resource + ".json";


        https://api.twitter.com/1.1/users/show.json?screen_name=twitterdev

        $.ajax({
            type: method,
            url: url,
            data: params,
            success: success,
            error: failure,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain:true,
            beforeSend: this._add_oauth_header
        });
    };

    this._add_oauth_header = function (xhr, settings) {
        xhr.setRequestHeader("Authorization", "JWT " + get_auth_token());
    }


}