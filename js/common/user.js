function User(user) {
    this.id = this.createId();
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.role = user.role;
}

User.prototype.createId = function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

User.prototype.fromJson = function(user) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.role = user.role;
    return this;
};