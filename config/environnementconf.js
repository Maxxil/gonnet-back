module.exports ={
    environnement : 'PROD',
    getListeningPort : function () {
        if(this.environnement == "DEV")
        {
            return 4444;
        }
        else{
            return 4444;
        }
    }
};
