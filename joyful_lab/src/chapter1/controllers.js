function HelloController($scope, $location){
    $scope.greeting = {
        text: "placeholder"
    };
};


function JAVA_likes($scope, $location){
    var cnt=0

    var move = setInterval(function(){
        cnt++;
        $scope.hi = {
            text : cnt
        }
        console.log($scope.hi.text)
        var ids = document.getElementById("txt")
        var txt = $scope.hi.text;
        ids.innerHTML = txt

    },50);
}