/*
 *
 * @licstart  The following is the entire license notice for the 
 * JavaScript code in this page.
 * 
 * Copyright (c) 2012-2013 RockStor, Inc. <http://rockstor.com>
 * This file is part of RockStor.
 * 
 * RockStor is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published
 * by the Free Software Foundation; either version 2 of the License,
 * or (at your option) any later version.
 * 
 * RockStor is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 * 
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 * 
 */

ShutdownView = RockstorLayoutView.extend({
  
  initialize: function() {
    // call initialize of base
    this.constructor.__super__.initialize.apply(this, arguments);
   this.template = window.JST.common_navbar;
    this.paginationTemplate = window.JST.common_pagination;
    this.timeLeft = 60;
  },

 render: function() {
    var _this = this;
    
    if (confirm('Are you sure you want to Shutdown?')) {
     $('#update-modal').modal('show');
        
     
     $.ajax({
        url: "/api/commands/shutdown", 
        type: "POST",
        dataType: "json",
        global: false, // dont show global loading indicator
        success: function(data, status, xhr) {
        _this.startForceRefreshTimer();
      },
      error: function(xhr, status, error) {
     // var msg = xhr.responseText;
       
     }
     });
     }else{
      location.reload(history.go(-1));
    }
    
    return this;
  },
 
 
   // countdown timeLeft seconds and then force a window reload 
  startForceRefreshTimer: function() {
    var _this = this;
    this.forceRefreshTimer = window.setInterval(function() {
      _this.timeLeft = _this.timeLeft - 1;
      if (_this.timeLeft <= 0) {
        location.reload(true);
      }
      
    }, 1000);
  },


  
});



