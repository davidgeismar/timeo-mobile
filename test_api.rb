require 'rest-client'
# request = RestClient::Request.new(
#           :method => :post,
#           :url => 'https://staging.obeya.io/internal/timeo/api/v0/actions/5bac9e340c56766d0734c386/action-file',
#           headers: {authorization: 'Bearer 02aa835f3f870c3c708d05a2ba97ccdca4aab574a06b2192809106e96ed70a7e'},
#           :payload => {
#             :multipart => true,
#             action_file: {
#               title: 'fu.png',
#               kind: 'file',
#               file: File.new("/Users/davidgeismar/Desktop/fu.png", 'rb')
#             }
#           })
# response = request.execute

request = RestClient::Request.new(
          :method => :delete,
          :url => 'https://staging.obeya.io/internal/timeo/api/v0/5badf3820c56766d10c90562/action-file/5bac9e340c56766d0734c386',
          headers: {authorization: 'Bearer 02aa835f3f870c3c708d05a2ba97ccdca4aab574a06b2192809106e96ed70a7e'},
        )
response = request.execute
puts(response)
