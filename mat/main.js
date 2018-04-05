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
    $scope.calcQ = function(sum_q_ov, sum_q_t){
        var c1 = sum_q_ov || $scope.q_ov;
        var c2 = sum_q_t || $scope.q_t;
        return c1 + c2;
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
        if(i1 && i2 && i_n && u_pod && $scope.g_pr){
            return ($scope.d_pr = $scope.g_pr * ((i1 - i2) / (0.98 * (i_n - i2) * u_pod))).toFixed(3);
        }
        return $scope.d_pr = NaN || 0;
    }

    $scope.caclGTouchPr = function(){
        $scope.gTouchPr = $scope.d_pr + $scope.g_pr; 
        return $scope.gTouchPr.toFixed(3);
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
            return (($scope.d_sv2 = $scope.g_sv * (t_ll_sv - t_l_sv)) / 
                    (i_ll - i_k) * u_pod
                    ).toFixed(3);
        }
        return $scope.d_sv2 = NaN;
    }

    $scope.tlll_sv = NaN;
    $scope.calcTlllsv = function(t_ll_sv, i_ll_vip, i_k, u_pod){
        if(t_ll_sv && i_ll_vip && i_k && u_pod && $scope.d_vip && $scope.g_hvo){
            return ( tlll_sv = t_ll_sv + (($scope.d_vip * (i_ll_vip - i_k)) 
            / ($scope.g_hvo * u_pod))
                    ).toFixed(3);
        }
        return $scope.d_sv2 = NaN;
    }

    $scope.dd2 = NaN;
    $scope.calcDD2 = function(i_l_d, t_ll_vip, i_ll_d, sum_g_i, i_ll_k, i_ll_d) {
        //( G д ⋅ i'д + D вып ⋅ t''вып ) / i''д  - ( ΣG i + D пр ⋅ i''к ) / i''д
        var gi = sum_g_i ||$scope.g_i ;
        $scope.dd2 = ($scope.g_d * i_l_d + $scope.d_vip * t_ll_vip) / i_ll_d - (gi + $scope.d_pr * i_ll_k) / i_ll_d;
        return $scope.dd2.toFixed(3);
    }

    $scope.sumQov = function(q_ov){
        $scope.sum_q_ov += q_ov;
    }
    $scope.sumQt = function(q_t){
        $scope.sum_q_t += q_t;
    }
    $scope.sumGi = function(g_i){
        $scope.sum_g_i += g_i;
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
});









