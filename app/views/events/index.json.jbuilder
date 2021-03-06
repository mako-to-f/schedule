json.array! @events do |event|
  json.id              event.id
  json.project_id      event.project_id
  json.title           event.title
  json.allDay          event.all_day
  json.start           event.start
  json.end             event.end_time
  json.backgroundColor event.bar_color
  json.borderColor     event.bar_color
end
