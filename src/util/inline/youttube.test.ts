import { getYouTubeId } from './youtube'

describe("getYouTubeId", function() {

    test("Regular link", function() {
        expect(getYouTubeId("https://www.youtube.com/watch?v=Kh8agVOc9bI")).toBe("Kh8agVOc9bI");
    });

    test("Share link", function() {
        expect(getYouTubeId("https://youtu.be/Kh8agVOc9bI")).toBe("Kh8agVOc9bI");
    });

    test("Share link - http", function() {
        expect(getYouTubeId("http://youtu.be/Kh8agVOc9bI")).toBe("Kh8agVOc9bI");
    });

    test("Embedded link", function() {
        expect(getYouTubeId("https://www.youtube.com/embed/Kh8agVOc9bI")).toBe("Kh8agVOc9bI");
    });

    test("Regular link - with options", function() {
        expect(getYouTubeId("https://www.youtube.com/watch?v=Kh8agVOc9bI&controls=2")).toBe("Kh8agVOc9bI");
    });

    test("Share link - with options", function() {
        expect(getYouTubeId("https://youtu.be/Kh8agVOc9bI?controls=2")).toBe("Kh8agVOc9bI");
    });

    test("Share link - http - with options", function() {
        expect(getYouTubeId("http://youtu.be/Kh8agVOc9bI?controls=2")).toBe("Kh8agVOc9bI");
    });

    test("Embedded link - with options", function() {
        expect(getYouTubeId("https://www.youtube.com/embed/Kh8agVOc9bI?controls=2")).toBe("Kh8agVOc9bI");
    });
});