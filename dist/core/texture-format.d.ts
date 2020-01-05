export declare enum TextureFormat {
    RGB = 1,
    RGBA = 2,
    LUMINANCE_ALPHA = 3,
    LUMINANCE = 4,
    ALPHA = 5,
    R8 = 6,
    R16F = 7,
    R32F = 8,
    R8UI = 9,
    RG8 = 10,
    RG16F = 11,
    RG32F = 12,
    RG8UI = 13,
    RGB8 = 14,
    SRGB8 = 15,
    RGB565 = 16,
    R11F_G11F_B10F = 17,
    RGB9_E5 = 18,
    RGB16F = 19,
    RGB32F = 20,
    RGB8UI = 21,
    RGBA8 = 22,
    SRGB8_ALPHA8 = 23,
    RGB5_A1 = 24,
    RGB10_A2 = 25,
    RGBA4 = 26,
    RGBA16F = 27,
    RGBA32F = 28,
    RGBA8UI = 29,
    DEPTH_COMPONENT = 30,
    DEPTH_STENCIL = 31
}
export declare function mapGLFormat(gl: WebGL2RenderingContext, format: TextureFormat): [GLenum, GLenum, GLenum];
