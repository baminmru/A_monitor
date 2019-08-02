Imports System
Imports System.Globalization

Public Class BitwiseUtils
    Public Shared Function BcdToDec(ByVal bcd As Byte) As Byte
        Return CByte(BitwiseUtils.BcdToDec(CInt(bcd)))
    End Function

    Public Shared Function BcdToDec(ByVal bcd As Integer) As Integer
        Return CInt(BitwiseUtils.BcdToDec(CUInt(bcd)))
    End Function

    Public Shared Function BcdToDec(ByVal bcd As UInteger) As UInteger
        Dim num1 As UInteger = 0
        Dim num2 As UInteger = bcd

        For index As Integer = 0 To 8 - 1
            Dim num3 As UInteger = num2 And &HF
            If num3 > &H9 Then Throw New Exception(String.Format("Ошибка преобразования значения 0x{0:X} из формата BCD", CObj(bcd)))
            num1 += num3 * CUInt(Math.Pow(10.0, CDbl(index)))
            num2 = num2 >> 4
        Next

        Return num1
    End Function

    Public Shared Function BcdToDec(ByVal bcd As Long) As Long
        Dim result As Long = 0
        If Not Long.TryParse(String.Format(CType(CultureInfo.InvariantCulture, IFormatProvider), "{0:X}", CObj(bcd)), result) Then Throw New Exception(String.Format("Ошибка преобразования значения 0x{0:X} из формата BCD", CObj(bcd)))
        Return result
    End Function

    Public Shared Function Dec2Bcd(ByVal dec As Integer) As Integer
        Return CInt(BitwiseUtils.Dec2Bcd(CUInt(dec)))
    End Function

    Public Shared Function Dec2Bcd(ByVal dec As Byte) As Byte
        Return CByte(BitwiseUtils.Dec2Bcd(CInt(dec)))
    End Function

    Public Shared Function Dec2Bcd(ByVal dec As UShort) As UShort
        Return CUShort(BitwiseUtils.Dec2Bcd(CUInt(dec)))
    End Function

    Public Shared Function Dec2Bcd(ByVal dec As UInteger) As UInteger
        Dim num1 As UInteger = 0
        Dim num2 As UInteger = dec

        For index As Integer = 0 To 8 - 1
            Dim num3 As UInteger = num2 Mod 10UI
            num1 += num3 << index * 4
            num2 = num2 / 10
        Next

        Return num1
    End Function

    Public Shared Function Reverse(ByVal input As Byte()) As Byte()
        Array.Reverse(CType(input, Array))
        Return input
    End Function

    Public Shared Function Reverse(ByVal input As Short) As Short
        Array.Reverse(CType(BitConverter.GetBytes(input), Array))
        Return input
    End Function

    Public Shared Function Reverse(ByVal input As Integer) As Integer
        Array.Reverse(CType(BitConverter.GetBytes(input), Array))
        Return input
    End Function

    Public Shared Function Reverse(ByVal input As UShort) As UShort
        Return CUShort(BitwiseUtils.Reverse(CShort(input)))
    End Function
End Class
