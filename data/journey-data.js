const journeyData = {
    1: { 
        title: "Bến cảng Nhà Rồng (1911)", 
        country: "Việt Nam", 
        year: "1911", 
        question: "Vì sao Nguyễn Tất Thành ra đi tìm đường cứu nước?", 
        answers: [
            { title: "Hoàn cảnh", desc: "Đất nước bị Pháp đô hộ. Nhân dân lầm than. Các phong trào yêu nước thất bại." }, 
            { title: "Mục đích", desc: "Tìm con đường cứu nước mới. Tìm cách giải phóng dân tộc. Học hỏi kinh nghiệm thế giới." }, 
            { title: "Ý nghĩa", desc: "Mở đầu hành trình cứu nước. Đánh dấu bước ngoặt của lịch sử dân tộc." }
        ] 
    },
    2: { 
        title: "Ở Pháp (1911-1912)", 
        country: "Pháp", 
        year: "1911-1912", 
        question: "Nguyễn Tất Thành nhận thức được điều gì khi đến Pháp?", 
        answers: [
            { title: "Hoạt động", desc: "Lao động kiếm sống và trực tiếp quan sát xã hội Pháp." }, 
            { title: "Phát hiện", desc: "Nhân dân lao động bị bóc lột. Thực dân áp bức thuộc địa. Khẩu hiệu dân chủ chỉ mang tính hình thức." }, 
            { title: "Nhận thức", desc: "Không phải nhân dân Pháp là kẻ thù, kẻ thù đích thực là chủ nghĩa thực dân." }
        ] 
    },
    3: { 
        title: "Ở Mỹ (1912-1913)", 
        country: "Mỹ", 
        year: "1912-1913", 
        question: "Nguyễn Tất Thành học được gì từ nước Mỹ?", 
        answers: [
            { title: "Quan sát", desc: "Một quốc gia phát triển với nền kinh tế hiện đại." }, 
            { title: "Thực trạng", desc: "Tồn tại sự phân biệt chủng tộc, bất công xã hội và người lao động bị bóc lột." }, 
            { title: "Bài học", desc: "Độc lập là chưa đủ, mà còn phải bảo đảm được quyền con người." }
        ] 
    },
    4: { 
        title: "Ở Anh (1914-1917)", 
        country: "Anh", 
        year: "1914-1917", 
        question: "Những trải nghiệm tại Anh giúp ích gì cho Nguyễn Tất Thành?", 
        answers: [
            { title: "Hoạt động", desc: "Lao động kiếm sống, học ngoại ngữ và tự nghiên cứu chính trị." }, 
            { title: "Nhận thức", desc: "Hiểu đời sống công nhân, thấy sự bất công xã hội và hiểu bản chất chủ nghĩa tư bản." }, 
            { title: "Ý nghĩa", desc: "Tích lũy khối lượng kiến thức lớn, chuẩn bị nền tảng cho giai đoạn tiếp theo." }
        ] 
    },
    5: { 
        title: "Ở Pháp (1917-1923)", 
        country: "Pháp", 
        year: "1917-1923", 
        question: "Bước ngoặt lớn nhất trong quá trình tìm đường cứu nước là gì?", 
        answers: [
            { title: "1919", desc: "Gửi Bản yêu sách của nhân dân An Nam, đòi quyền tự do cho dân tộc Việt Nam." }, 
            { title: "1920", desc: "Đọc Luận cương của Lênin, tìm thấy con đường cứu nước và tin theo cách mạng vô sản." }, 
            { title: "Ý nghĩa", desc: "Đánh dấu bước chuyển biến từ một người yêu nước trở thành người cộng sản." }
        ] 
    },
    6: { 
        title: "Ở Liên Xô (1924)", 
        country: "Liên Xô", 
        year: "1924", 
        question: "Tại sao Liên Xô có vai trò quan trọng với Nguyễn Ái Quốc?", 
        answers: [
            { title: "Học tập", desc: "Học tập Chủ nghĩa Mác - Lênin, kinh nghiệm cách mạng Nga và hoạt động Quốc tế Cộng sản." }, 
            { title: "Tiếp thu", desc: "Tiếp thu lý luận cách mạng vô sản và phương pháp tổ chức cách mạng." }, 
            { title: "Kết quả", desc: "Hoàn thiện hệ thống tư tưởng lý luận cứu nước." }
        ] 
    },
    7: { 
        title: "Ở Trung Quốc (1924-1927)", 
        country: "Trung Quốc", 
        year: "1924-1927", 
        question: "Nguyễn Ái Quốc chuẩn bị gì cho sự ra đời của Đảng?", 
        answers: [
            { title: "Tổ chức", desc: "Thành lập Hội Việt Nam Cách mạng Thanh niên (1925)." }, 
            { title: "Cán bộ", desc: "Mở các lớp huấn luyện và đào tạo cán bộ cách mạng." }, 
            { title: "Tư tưởng", desc: "Xuất bản báo Thanh Niên và tác phẩm Đường Kách mệnh, chuẩn bị đầy đủ cho việc lập Đảng." }
        ] 
    },
    8: { 
        title: "Ở Thái Lan (1928)", 
        country: "Thái Lan", 
        year: "1928", 
        question: "Hoạt động ở Thái Lan có ý nghĩa gì?", 
        answers: [
            { title: "Hoạt động", desc: "Tuyên truyền cách mạng, vận động Việt kiều và xây dựng cơ sở cách mạng." }, 
            { title: "Mục tiêu", desc: "Củng cố phong trào và duy trì liên lạc mật thiết với trong nước." }, 
            { title: "Ý nghĩa", desc: "Góp phần chuẩn bị cho quá trình thống nhất các tổ chức cộng sản." }
        ] 
    },
    9: { 
        title: "Thành lập Đảng (1930)", 
        country: "Việt Nam", 
        year: "1930", 
        question: "Vì sao thành lập Đảng là thành quả lớn nhất của hành trình cứu nước?", 
        answers: [
            { title: "Hoàn cảnh", desc: "Xuất hiện nhiều tổ chức cộng sản, đặt ra yêu cầu cấp thiết phải thống nhất lực lượng." }, 
            { title: "Hội nghị hợp nhất", desc: "Diễn ra tại Hương Cảng (Tháng 2/1930) do Nguyễn Ái Quốc chủ trì, thống nhất thành Đảng Cộng sản Việt Nam." }, 
            { title: "Ý nghĩa", desc: "Chấm dứt khủng hoảng đường lối, thống nhất phong trào cách mạng, mở ra bước ngoặt lịch sử dân tộc." }
        ] 
    }
};