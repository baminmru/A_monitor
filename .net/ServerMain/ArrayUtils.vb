Imports System
Imports System.Text

Public Class ArrayUtils
    Public Shared Function SubArray(Of T)(ByVal data As T(), ByVal index As Integer, ByVal length As Integer) As T()
        If length = -1 Then length = data.Length - index
        Dim objArray As T() = New T(length - 1) {}
        Array.Copy(CType(data, Array), index, CType(objArray, Array), 0, length)
        Return objArray
    End Function

    Public Shared Function IndexOfSequence(ByVal arr As Byte(), ByVal sequence As String) As Integer
        Return Encoding.GetEncoding(1251).GetString(arr).IndexOf(sequence)
    End Function

    Public Shared Function DirectConvert(ByVal bytes As Byte()) As String
        Dim chArray As Char() = New Char(bytes.Length - 1) {}

        For index As Integer = 0 To bytes.Length - 1
            chArray(index) = ChrW(bytes(index))
        Next

        Return New String(chArray)
    End Function

    Public Shared Function DirectConvert(ByVal s As String) As Byte()
        Dim B() As Byte
        B = System.Text.Encoding.Default.GetBytes(s)
        Return B
    End Function

    Public Shared Function Equal(ByVal ar1 As Byte(), ByVal ar2 As Byte()) As Boolean
        If ar1 Is Nothing AndAlso ar2 Is Nothing Then Return True
        If ar1 Is Nothing OrElse ar2 Is Nothing OrElse ar1.Length <> ar2.Length Then Return False

        For index As Integer = 0 To ar1.Length - 1
            If CInt(ar1(index)) <> CInt(ar2(index)) Then Return False
        Next

        Return True
    End Function

    Public Function ToHexString(ByVal data As Byte()) As String
        If data Is Nothing OrElse data.Length = 0 Then Return String.Empty
        Dim strTemp As New StringBuilder(data.Length * 2)
        For Each b As Byte In data
            strTemp.Append(b.ToString("X02"))
        Next
        Return strTemp.ToString()
    End Function

    Public Shared Function AllBytesAreEqualTo(ByVal array As Byte(), ByVal index As Integer, ByVal length As Integer, ByVal compare As Byte) As Boolean
        If index >= array.Length Then Throw New IndexOutOfRangeException()
        If index + length > array.Length Then Throw New IndexOutOfRangeException()

        For index1 As Integer = index To index + length - 1
            If CInt(array(index1)) <> CInt(compare) Then Return False
        Next

        Return True
    End Function

    Public Shared Function AllBytesAreEqualTo(ByVal array As Byte(), ByVal compare As Byte) As Boolean
        Return AllBytesAreEqualTo(array, 0, array.Length, compare)
    End Function
End Class
