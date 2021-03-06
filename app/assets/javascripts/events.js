$(document).on('turbolinks:load', function() {
  $('#calendar').fullCalendar({
    header: {
      left:'title',
      center: '',
      right: 'month,agendaWeek,agendaDay today prev,next',
    },
    firstDay: 1,
    navLinks: true,
    weekNumbers: true,
    weekNumbersWithinDays: true,
    nowIndicator: true,
    editable: true,
    eventLimit: true,
    events: location.href,

    eventClick: function(event) {
      location.href = `/projects/${event.project_id}/events/${event.id}`
    },

    eventResize: function(event) {
      var end = []
      end.push(event.end._d.getUTCFullYear());
      end.push(event.end._d.getUTCMonth() + 1);
      end.push(event.end._d.getUTCDate());
      end.push(event.end._d.getUTCHours());
      end.push(event.end._d.getUTCMinutes());
      var endTime = end[0] + '-' + end[1] + '-' + end[2] + ' ' + end[3] + ':' + end[4];
      var data = {
        event: {
          end_time: endTime,
        }
      };

      $.ajax({
        type: 'PATCH',
        url:  `/projects/${event.project_id}/events/${event.id}`,
        data: data,
        dataType: 'json'
      })
    },

    eventDrop: function(event) {
      var start = []
      start.push(event.start._d.getUTCFullYear());
      start.push(event.start._d.getUTCMonth() + 1);
      start.push(event.start._d.getUTCDate());
      start.push(event.start._d.getUTCHours());
      start.push(event.start._d.getUTCMinutes());
      var startTime = start[0] + '-' + start[1] + '-' + start[2] + ' ' + start[3] + ':' + start[4];
      if (event.end) {
        var end = []
        end.push(event.end._d.getUTCFullYear());
        end.push(event.end._d.getUTCMonth() + 1);
        end.push(event.end._d.getUTCDate());
        end.push(event.end._d.getUTCHours());
        end.push(event.end._d.getUTCMinutes());
        var endTime = end[0] + '-' + end[1] + '-' + end[2] + ' ' + end[3] + ':' + end[4];
      }
      var data = {
        event: {
          all_day : event.allDay,
          start:    startTime,
          end_time: endTime,
        }
      };

      $.ajax({
        type: 'PATCH',
        url:  `/projects/${event.project_id}/events/${event.id}`,
        data: data,
        dataType: 'json'
      })
    },
  });
});
