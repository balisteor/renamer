var test = require("tape"),
    renamer = require("../lib/renamer"),
    Options = require("../lib/RenamerOptions"),
    path = require("path");

var preset = {
    one: [ "file1.txt", "file2.txt", "folder/file3.txt"]
};

test("--replace: replace whole string", function(t){
    var options = new Options({
        files: preset.one,
        replace: "{{index}}.txt"
    });
    var results = renamer.replace(options);
    results = renamer.replaceIndexToken(results);
    t.deepEqual(results, [
        { before: "file1.txt", after: "1.txt" },
        { before: "file2.txt", after: "2.txt" },
        { before: path.join("folder", "file3.txt"), after: path.join("folder", "3.txt") }
    ]);
    t.end();
});

test("--replace, --regex: replace whole string", function(t){
    var options = new Options({
        files: preset.one,
        replace: "{{index}}.txt",
        regex: true
    });
    var results = renamer.replace(options);
    results = renamer.replaceIndexToken(results);
    t.deepEqual(results, [
        { before: "file1.txt", after: "1.txt" },
        { before: "file2.txt", after: "2.txt" },
        { before: path.join("folder", "file3.txt"), after: path.join("folder", "3.txt") }
    ]);
    t.end();
});
