var app = angular.module('heroApp', []).controller('MainCtrl', function MainCtrl($scope) {
    $scope.sum_q_ov = 0;
    $scope.sum_q_t = 0;
    $scope.sum_g_i = 0;
    $scope.d = 0;
    $scope.d_pot = 0;
    $scope.d_full = 0;
    $scope.g_pr = 0;
    $scope.d_pr = 0;
    $scope.gTouchPr = 0;
    $scope.g_pit;
    $scope.g_d = 0;
    $scope.d_vip = 0;
    $scope.g_hvo = 0;


    // Interpolated entalpia - water
    $scope.i2 = [
        431.76,
        Math.round(interpolate(0.11277, 0.115, 0.11678, 431.76, 435.99), 1),
        440.21,
        444.44,
        Math.round(interpolate(0.12951, 0.13, 0.13401, 448.67, 452.9),1),
        Math.round(interpolate(0.13401, 0.135, 0.13863, 452.9, 457.9),1),
        Math.round(interpolate(0.13863, 0.14, 0.14338, 457.9, 461.36),1),
        Math.round(interpolate(0.14338, 0.145, 0.14826, 461.36, 465.60),1),
        Math.round(interpolate(0.14826, 0.15, 0.15328, 465.60, 469.36),1),
    ]
    

    // Interpolated entalpia - heat

    $scope.i_n = [
        2680.3,
        Math.round(interpolate(0.11277, 0.115, 0.11678, 2680.3, 2681.8),1),
        2683.4,
        2684.9,
        Math.round(interpolate(0.12951, 0.13, 0.13401, 2686.5, 2688.0), 1),
        Math.round(interpolate(0.13401, 0.135, 0.13863, 2688.0, 2689.5), 1 ), 
        Math.round(interpolate(0.13863, 0.14, 0.14338, 2689.5, 2691.1), 1),
        Math.round(interpolate(0.14338, 0.145, 0.14826, 2691.1, 2692.6), 1),
        Math.round(interpolate(0.14826, 0.15, 0.15328, 2692.6, 2694.1), 1)
    ]

    function mergeInterpolations(intArr1, intArr2){
       var result = [];
       intArr1.forEach(function(el, i)  {
        result.push(`i1 = ${intArr1[i]}, i2 = ${intArr2[i]}`)
       });
       return result;
    }
  

    $scope.i_k = $scope.i2.slice();
    $scope.i_ll_vip = $scope.i_n.slice();



    $scope.calcQ = function(sum_q_ov, sum_q_t){
        var c1 = sum_q_ov || $scope.q_ov;
        var c2 = sum_q_t || $scope.q_t;
        return c1 - c2;
    }

    $scope.calcD = function(d_t, d_ov, d_gv){
        if(d_t && d_ov && d_gv){
            return $scope.d = d_t + d_ov + d_gv;
        }
        return $scope.d = NaN;
    }

    $scope.calcDfull = function(a1, a2, a3, a4) {
        if(a1 && a2 && a3 && a4){
            return $scope.d_full = a1 + a2 + a3 + a4;
        }
        return $scope.d_full = NaN;
    }

    $scope.calcDpot = function(d){
        $scope.d_pot = d * 0.02;
        return $scope.d_pot.toFixed(3);
    }

    $scope.calcGpr = function(p_pr){
        $scope.g_pr = p_pr * ($scope.d_full / 100);
        return $scope.g_pr.toFixed(3)
    }
    $scope.calcDpr = function(i1, i2, i_n, u_pod){
        if(i1 && i2.length > 0 && i_n.length > 0 && u_pod && $scope.g_pr){
        var result = [];
        for(var i = 0 ; i < i_n.length; i++ ){
            val = ($scope.g_pr * ((i1 - i2[i]) / (0.98 * (i_n[i] - i2[i]) * u_pod))).toFixed(4);
            val = parseFloat(val);
            result.push(val);
        }

        return $scope.d_pr = result;
        }
        return $scope.d_pr = NaN || 0;
        
    }

    

    $scope.caclGTouchPr = function(){
        var result = [];
        for(var i = 0 ; i < $scope.d_pr.length; i++ ){
            val = ($scope.d_pr[i] + $scope.g_pr).toFixed(4);
           
            val = parseFloat(val);
            result.push(val);
        }
       
        $scope.gTouchPr = result;
        return result;
    }

    $scope.calcGPit = function(dTouchPr){
        g_pit = dTouchPr + $scope.d_full;
        return g_pit.toFixed(3);
    }

    $scope.calcGd = function(g_podp) {
        $scope.g_d =  g_pit + g_podp;
        return $scope.g_d.toFixed(3);
    }
    $scope.calcDvip = function(){
        $scope.d_vip = 0.04 * $scope.g_d;
        return $scope.d_vip.toFixed(3);
    }

    $scope.calcGHvo = function(g_two, g_podp){
        $scope.g_hvo = g_two * $scope.g_pr * g_podp * $scope.d_pot * $scope.d_vip; 
        return  $scope.g_hvo.toFixed(3);
    }

    $scope.g_sv = NaN;
    $scope.calcGSv = function(k){
        $scope.g_sv = k * $scope.g_hvo;
        return $scope.g_sv.toFixed(3);
    }

    $scope.d_sv2 = NaN;
    $scope.calcDSv = function(t_ll_sv, t_l_sv, i_ll, i_k, u_pod){
        

        if(t_ll_sv && t_l_sv && i_ll&& u_pod && i_k && $scope.g_sv){

           
            var result = [];
            for(var i = 0; i < i_k.length; i++ ){
                var val = (($scope.g_sv * (t_ll_sv - t_l_sv)) / 
                (i_ll - i_k[i]) * u_pod
                ).toFixed(3);
              
                val = parseFloat(val);
                result.push(val);
                
            }

            $scope.d_sv2 = result;
            
            return result;
        }
       
    }

    $scope.tlll_sv = NaN;
    $scope.calcTlllsv = function(t_ll_sv, i_ll_vip, i_k, u_pod){
        if(t_ll_sv && i_ll_vip.length > 0 && i_k.length > 0 && u_pod && $scope.d_vip && $scope.g_hvo){
            var result = [];
           
           
          
                for(var i = 0; i < i_ll_vip.length; i++){
                    val =  (t_ll_sv + (($scope.d_vip * (i_ll_vip[i] - i_k[i])) 
                    / ($scope.g_hvo * u_pod))
                            ).toFixed(4);
           
                    val = parseFloat(val);
                    result.push(val);
                    
                }
                $scope.tlll_sv = result;
                
            return result;
        }
       
    }

    $scope.dd2 = NaN;
    $scope.calcDD2 = function(i_l_d, t_ll_vip, i_ll_d, sum_g_i, i_ll_k) {
       
        var result = [];
     
        var gi = sum_g_i ||$scope.g_i ;
        for(var i = 0; i < $scope.d_pr.length; i++){
            val =  ($scope.g_d * i_l_d + $scope.d_vip * t_ll_vip) / i_ll_d - (gi + $scope.d_pr[i] * i_ll_k) / i_ll_d;
            val = val.toFixed(4);
            val = parseFloat(val);
            result.push(val);
            
            
        }
   
        $scope.dd2 = result;


        return result;
    }

    $scope.sumQov = function(q_ov){
        $scope.sum_q_ov += q_ov;
        $scope.q_ov = undefined;
    }
    $scope.sumQt = function(q_t){
        $scope.sum_q_t += q_t;
        $scope.q_t = undefined;
    }
    $scope.sumGi = function(g_i){
        $scope.sum_g_i += g_i;
        $scope.g_i = undefined;
    }
    $scope.clearSumQov = function(){
        $scope.sum_q_ov = 0;
    }
    $scope.clearSumQt = function(){
        $scope.sum_q_t = 0;
    }
    $scope.clearSumGi = function(){
        $scope.sum_g_i = 0;
    }
    $scope.q = $scope.q_ov + $scope.q_t;


    function interpolate (x1, x2, x3, h1, h3) {
        return ((h3 - h1 ) / (x3 - x1)) * (x2 - x1) + h1;
    }

    function relatePAndIntalpia(arr) {
        let p = [0.11 , 0.115, 0.12, 0.125, 0.13 , 0.135, 0.14, 0.145, 0.15];
        str = [];

        arr.forEach(function(element, i) {
            str.push(`При P = ${p[i]}, i = ${element}`);
        });
        return str;
    }

    $scope.i2_string = relatePAndIntalpia($scope.i2);
    $scope.i_k_string = relatePAndIntalpia($scope.i_k);
   
    
    $scope.i_n_string = relatePAndIntalpia($scope.i_n);
    $scope.i_ll_vip_string = relatePAndIntalpia($scope.i_ll_vip);


    var mergedInt = mergeInterpolations($scope.i2, $scope.i_n);
    
   
   

    $scope.drawGraph = function(){

            var finalArr = [];

            $scope.dd2.forEach(function(el, i) {
                finalArr.push(el + $scope.d_sv2[i]);
            });
        
            var finalValue = $scope.d * 0.09; 
            var lineArr = [];
            for(var i = 0; i < 9; i++){
                lineArr.push(finalValue);
            }

            console.log(finalValue);
            console.log(finalArr);
            
            var ctx =  document.querySelector("canvas");
        
            var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: mergedInt,
        
                datasets: [{
                    label: 'Общий расход на дэоратор и на подогреватель сырой воды',
                    data: finalArr,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(89, 229, 220, 0.2)',
                        'rgba(152, 129, 226, 0.2)',
                        'rgba(249, 104, 208, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgb(89, 229, 220)',
                        'rgb(152, 129, 226)',
                        'rgb(249, 104, 208)'
                    ],
                    borderWidth: 1
                    }, 
                    {
                        label: '9% от D',
                        data: lineArr,
                        backgroundColor: 
                            'rgb(104, 249, 135)',
                        
                        borderColor: 
                            'rgb(104, 249, 135)',
                    
                    type: 'line',
                    fill: false,
                    untouched: true
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }
});










