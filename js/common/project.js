function Project(project) {
    this.id = this.createId();
    this.name = project.name;
    this.status = project.status;
}

Project.prototype.createId = function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

Project.prototype.fromJson = function(project) {
    this.id = project.id;
    this.name = project.name;
    this.status = project.status;
    return this;
};