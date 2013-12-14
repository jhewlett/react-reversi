var Reversi = Reversi || {};

Reversi.TaskCollection = function() {
    var _tasks = [];
    var _finishedTasks = 0;

    radio('taskFinished').subscribe(function() {
        _finishedTasks++;
    });

    var addTask = function(func) {
        _tasks.push(func);
    };

    var waitAll = function() {
        for (var i = 0; i < _tasks.length; i++) {
            setTimeout(_tasks[i], 0);
        }

        waitInternal();
    };

    var waitInternal = function() {
        if (_finishedTasks < _tasks.length) {
            setTimeout(waitInternal, 50);
        }
    };

    return {
        addTask: addTask,
        waitAll: waitAll
    };
};